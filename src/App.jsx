import { useState, useEffect, useRef, useCallback } from "react";
import Timer from "./components/Timer";
import Controls from "./components/Controls";
import Settings from "./components/Settings";
import SessionTracker from "./components/SessionTracker";
import "./App.css";

const DEFAULT_SETTINGS = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
};

const SESSION_ORDER = ["work", "shortBreak", "work", "shortBreak", "work", "shortBreak", "work", "longBreak"];

export default function App() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SETTINGS.work * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  const currentSession = SESSION_ORDER[sessionIndex % SESSION_ORDER.length];

  const sessionLabel = {
    work: "Work",
    shortBreak: "Short Break",
    longBreak: "Long Break",
  }[currentSession];

  // Play beep sound using Web Audio API
  const playSound = useCallback(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtxRef.current = ctx;
    [0, 0.3, 0.6].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.4, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.4);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.4);
    });
  }, []);

  const advanceSession = useCallback(() => {
    playSound();
    setSessionIndex((prev) => {
      const next = (prev + 1) % SESSION_ORDER.length;
      const nextSession = SESSION_ORDER[next];
      setTimeLeft(settings[nextSession] * 60);
      return next;
    });
    setIsRunning(false);
    if (currentSession === "work") {
      setCompletedSessions((prev) => prev + 1);
    }
  }, [currentSession, playSound, settings]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            advanceSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, advanceSession]);

  const handleStartStop = () => setIsRunning((prev) => !prev);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(settings[currentSession] * 60);
  };

  const handleSkip = () => advanceSession();

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    setIsRunning(false);
    setSessionIndex(0);
    setTimeLeft(newSettings.work * 60);
    setShowSettings(false);
  };

  useEffect(() => {
    document.title = `${formatTime(timeLeft)} — ${sessionLabel}`;
  }, [timeLeft, sessionLabel]);

  function formatTime(secs) {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  const progress = 1 - timeLeft / (settings[currentSession] * 60);

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`} role="main">
      <header className="app-header">
        <h1 className="app-title">🍅 Pomodoro</h1>
        <div className="header-actions">
          <button
            className="icon-btn"
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀︎" : "☽"}
          </button>
          <button
            className="icon-btn"
            onClick={() => setShowSettings(true)}
            aria-label="Open settings"
          >
            ⚙︎
          </button>
        </div>
      </header>

      <div className="session-tabs" role="tablist">
        {["work", "shortBreak", "longBreak"].map((s) => (
          <button
            key={s}
            role="tab"
            aria-selected={currentSession === s}
            className={`tab ${currentSession === s ? "active" : ""}`}
            onClick={() => {
              setIsRunning(false);
              const idx = SESSION_ORDER.indexOf(s);
              setSessionIndex(idx);
              setTimeLeft(settings[s] * 60);
            }}
          >
            {{ work: "Work", shortBreak: "Short Break", longBreak: "Long Break" }[s]}
          </button>
        ))}
      </div>

      <Timer
        timeLeft={timeLeft}
        progress={progress}
        sessionLabel={sessionLabel}
        currentSession={currentSession}
      />

      <Controls
        isRunning={isRunning}
        onStartStop={handleStartStop}
        onReset={handleReset}
        onSkip={handleSkip}
      />

      <SessionTracker completed={completedSessions} />

      {showSettings && (
        <Settings
          settings={settings}
          onSave={handleSaveSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}