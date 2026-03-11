import { useState } from "react";

export default function Settings({ settings, onSave, onClose }) {
  const [form, setForm] = useState({ ...settings });

  const handleChange = (e) => {
    const val = Math.max(1, parseInt(e.target.value) || 1);
    setForm((prev) => ({ ...prev, [e.target.name]: val }));
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Settings">
      <div className="modal">
        <div className="modal-header">
          <h2>Settings</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close settings">✕</button>
        </div>
        <div className="modal-body">
          {[
            { label: "Work (minutes)", name: "work" },
            { label: "Short Break (minutes)", name: "shortBreak" },
            { label: "Long Break (minutes)", name: "longBreak" },
          ].map(({ label, name }) => (
            <div className="setting-row" key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                id={name}
                type="number"
                name={name}
                min="1"
                max="60"
                value={form[name]}
                onChange={handleChange}
                aria-label={label}
              />
            </div>
          ))}
        </div>
        <button className="save-btn" onClick={() => onSave(form)}>Save Changes</button>
      </div>
    </div>
  );
}