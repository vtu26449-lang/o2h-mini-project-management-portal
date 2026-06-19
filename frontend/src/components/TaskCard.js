import React from 'react';
import './TaskCard.css';

/**
 * TaskCard - Displays a single task with actions
 */
function TaskCard({ task, onComplete, onDelete }) {
  const { _id, title, description, status, createdAt } = task;

  const formattedDate = new Date(createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const statusClass =
    status === 'Completed'
      ? 'status-completed'
      : status === 'In Progress'
      ? 'status-inprogress'
      : 'status-pending';

  return (
    <div className={`task-card ${status === 'Completed' ? 'card-completed' : ''}`} role="article">
      <div className="task-card-header">
        <h3 className="task-title">{title}</h3>
        <span className={`status-badge ${statusClass}`} aria-label={`Status: ${status}`}>
          {status}
        </span>
      </div>

      <p className="task-description">{description}</p>

      <div className="task-card-footer">
        <span className="task-date" aria-label={`Created on ${formattedDate}`}>
          📅 {formattedDate}
        </span>

        <div className="task-actions">
          {status !== 'Completed' && (
            <button
              className="btn btn-success"
              onClick={() => onComplete(_id)}
              aria-label={`Mark "${title}" as completed`}
            >
              ✓ Complete
            </button>
          )}
          <button
            className="btn btn-danger"
            onClick={() => onDelete(_id)}
            aria-label={`Delete task "${title}"`}
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
