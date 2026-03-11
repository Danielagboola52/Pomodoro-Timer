export default function Timer({ timeLeft, progress, sessionLabel, currentSession }) {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
  
    const radius = 110;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - progress);
  
    const colors = {
      work: "#e85d4a",
      shortBreak: "#4ade80",
      longBreak: "#60a5fa",
    };
    const color = colors[currentSession];
  
    return (
      <div className="timer-container" aria-live="polite" aria-label={`${sessionLabel}: ${minutes}:${seconds} remaining`}>
        <svg className="progress-ring" width="260" height="260" viewBox="0 0 260 260">
          <circle cx="130" cy="130" r={radius} className="ring-bg" />
          <circle
            cx="130" cy="130" r={radius}
            className="ring-progress"
            stroke={color}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 130 130)"
          />
        </svg>
        <div className="timer-display">
          <span className="timer-time">{minutes}:{seconds}</span>
          <span className="timer-label" style={{ color }}>{sessionLabel}</span>
        </div>
      </div>
    );
  }