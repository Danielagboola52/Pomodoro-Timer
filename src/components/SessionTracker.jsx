export default function SessionTracker({ completed }) {
    const totalDots = 8;
    return (
      <div className="session-tracker" aria-label={`${completed} work sessions completed`}>
        <p className="tracker-label">Sessions Completed</p>
        <div className="dots">
          {Array.from({ length: totalDots }).map((_, i) => (
            <span
              key={i}
              className={`dot ${i < completed % (totalDots + 1) ? "filled" : ""}`}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="tracker-count">{completed} 🍅</p>
      </div>
    );
  }