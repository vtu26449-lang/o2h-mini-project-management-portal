import React from 'react';
import { Link } from 'react-router-dom';
import './EmptyState.css';

/**
 * EmptyState - Shown when no tasks exist
 */
function EmptyState({ filter }) {
  const isFiltered = filter && filter !== 'All';

  return (
    <div className="empty-state" role="status" aria-live="polite">
      <div className="empty-icon" aria-hidden="true">📭</div>
      <h3 className="empty-title">
        {isFiltered ? `No "${filter}" tasks found` : 'No tasks yet'}
      </h3>
      <p className="empty-text">
        {isFiltered
          ? 'Try changing the filter to see other tasks.'
          : 'Get started by creating your first task.'}
      </p>
      {!isFiltered && (
        <Link to="/add-task" className="empty-cta">
          + Create Task
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
