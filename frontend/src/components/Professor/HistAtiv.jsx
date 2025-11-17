import React from "react";
import "../../styles/pages/professor/histAtiv.scss";

export default function HistAtiv({ open, onClose, activities = [] }) {
  if (!open) return null;

  return (
    <div className="activities-modal-overlay" onClick={onClose}>
      <div
        className="activities-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="activities-modal-header">
          <h3>Histórico de Atividades</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <ul className="activities-modal-list">
          {(activities || []).map((item, index) => (
            <li key={index} className="activity-item">
              <div
                className="avatar"
                style={{ background: item.color || "#7c4dff" }}
              >
                {item.initials || "?"}
              </div>

              <div className="activity-info">
                <span className="name">{item.name}</span>
                <span className="time">{item.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
