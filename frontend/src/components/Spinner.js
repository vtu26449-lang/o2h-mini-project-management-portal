import React from 'react';
import './Spinner.css';

/**
 * Spinner - Loading indicator
 */
function Spinner({ message = 'Loading...' }) {
  return (
    <div className="spinner-container" role="status" aria-live="polite" aria-label={message}>
      <div className="spinner" aria-hidden="true"></div>
      <p className="spinner-text">{message}</p>
    </div>
  );
}

export default Spinner;
