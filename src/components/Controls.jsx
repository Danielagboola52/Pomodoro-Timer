export default function Controls({ isRunning, onStartStop, onReset, onSkip }) {
    return (
      <div className="controls" role="group" aria-label="Timer controls">
        <button className="ctrl-btn secondary" onClick={onReset} aria-label="Reset timer">
          ↺
        </button>
        <button className="ctrl-btn primary" onClick={onStartStop} aria-label={isRunning ? "Pause timer" : "Start timer"}>
          {isRunning ? "⏸" : "▶"}
        </button>
        <button className="ctrl-btn secondary" onClick={onSkip} aria-label="Skip to next session">
          ⏭
        </button>
      </div>
    );
  }