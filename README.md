# 🍅 Pomodoro Timer

A fully functional, accessible Pomodoro Timer web app built with **React + Vite**, featuring light/dark mode and customizable session durations.

🔗 **Live Project URL:** https://danielagboola52.github.io/Pomodoro-Timer

---

## 📸 Preview

A clean, minimal productivity timer with a circular progress ring, session tracking, and smooth dark/light mode transitions.

---

## ✨ Features

- ▶️ **Start, Pause & Resume** the timer at any point
- ⚙️ **Configurable durations** — Work, Short Break, Long Break
- 🔄 **Auto-advances** through sessions in order:
  `Work → Short Break → Work → Short Break → Work → Short Break → Work → Long Break`
- 🔔 **Sound notification** (Web Audio API) when a session ends
- 🍅 **Session tracker** — counts completed work sessions with dot indicators
- 🌙 **Dark & Light mode** toggle
- 📱 **Fully responsive** — works on mobile and desktop
- ♿ **Accessible** — ARIA labels, keyboard navigation, live regions

---

## 🛠️ Built With

- **React 18** — Component-based UI
- **Vite** — Fast development & build tool
- **CSS3** — Custom properties, animations, transitions
- **Web Audio API** — In-browser sound notifications (no dependencies)

---

## 📁 Project Structure

```
Pomodoro-Timer/
├── public/
├── src/
│   ├── components/
│   │   ├── Timer.jsx          # Circular progress ring + countdown
│   │   ├── Controls.jsx       # Start/Pause/Reset/Skip buttons
│   │   ├── SessionTracker.jsx # Dot indicators + session count
│   │   └── Settings.jsx       # Configurable durations modal
│   ├── App.jsx                # Main state management
│   ├── App.css                # All styles + theming
│   └── main.jsx               # React entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Danielagboola52/Pomodoro-Timer.git
   ```

2. Navigate into the folder:
   ```bash
   cd Pomodoro-Timer
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser at `http://localhost:5173`

---

## ⏱️ Default Session Configuration

| Session      | Duration   |
|---|---|
| Work         | 25 minutes |
| Short Break  | 5 minutes  |
| Long Break   | 15 minutes (after every 4 work sessions) |

All durations are fully customizable via the ⚙️ Settings panel.

---

## 📋 Requirements Met

- [x] User can start, stop and resume the timer
- [x] Configurable work, short break and long break durations
- [x] Displays current session type (Work / Short Break / Long Break)
- [x] Tracks the number of completed work sessions
- [x] Plays a sound when a session ends
- [x] Accessible with ARIA labels and keyboard navigation
- [x] Responsive on both desktop and mobile

---

## Project URL 
https://roadmap.sh/projects/pomodoro-timer

## live project Link

## 👤 Author

**Daniel Agboola**  
GitHub: [@Danielagboola52](https://github.com/Danielagboola52)
