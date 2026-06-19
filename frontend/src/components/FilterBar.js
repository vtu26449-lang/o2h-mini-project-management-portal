import React from 'react';
import './FilterBar.css';

const STATUSES = ['All', 'Pending', 'In Progress', 'Completed'];

/**
 * FilterBar - Filter tasks by status
 */
function FilterBar({ activeFilter, onFilterChange, counts }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter tasks by status">
      {STATUSES.map((status) => (
        <button
          key={status}
          className={`filter-btn ${activeFilter === status ? 'active' : ''}`}
          onClick={() => onFilterChange(status)}
          aria-pressed={activeFilter === status}
        >
          {status}
          {counts && counts[status] !== undefined && (
            <span className="filter-count">{counts[status]}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
