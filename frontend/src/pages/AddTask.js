import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../services/taskService';
import './AddTask.css';

const INITIAL_FORM = { title: '', description: '', status: 'Pending' };

function AddTask() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  // Validate form fields
  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = 'Title is required.';
    } else if (form.title.trim().length > 200) {
      newErrors.title = 'Title cannot exceed 200 characters.';
    }

    if (!form.description.trim()) {
      newErrors.description = 'Description is required.';
    } else if (form.description.trim().length < 20) {
      newErrors.description = `Description must be at least 20 characters (currently ${form.description.trim().length}).`;
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setSubmitting(true);
      setServerError('');
      await createTask({
        title: form.title.trim(),
        description: form.description.trim(),
        status: form.status,
      });
      navigate('/', { state: { message: 'Task created successfully!' } });
    } catch (err) {
      const msg =
        err.response?.data?.message || 'Failed to create task. Please try again.';
      setServerError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setServerError('');
  };

  const descLength = form.description.trim().length;

  return (
    <div className="add-task-page">
      <div className="form-card">
        {/* Header */}
        <div className="form-header">
          <h1 className="form-title">Add New Task</h1>
          <p className="form-subtitle">Fill in the details below to create a task.</p>
        </div>

        {/* Server error */}
        {serverError && (
          <div className="server-error" role="alert" aria-live="assertive">
            ⚠️ {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate aria-label="Add task form">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Task Title <span className="required" aria-hidden="true">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              placeholder="e.g. Build Login Page"
              value={form.title}
              onChange={handleChange}
              disabled={submitting}
              aria-required="true"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
              maxLength={200}
            />
            {errors.title && (
              <p id="title-error" className="field-error" role="alert">
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description <span className="required" aria-hidden="true">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              className={`form-textarea ${errors.description ? 'input-error' : ''}`}
              placeholder="Describe the task in at least 20 characters..."
              value={form.description}
              onChange={handleChange}
              rows={4}
              disabled={submitting}
              aria-required="true"
              aria-invalid={!!errors.description}
              aria-describedby="desc-hint description-error"
            />
            <div className="desc-meta">
              <span
                id="desc-hint"
                className={`char-count ${descLength < 20 ? 'char-insufficient' : 'char-ok'}`}
              >
                {descLength} / 20 min characters
              </span>
            </div>
            {errors.description && (
              <p id="description-error" className="field-error" role="alert">
                {errors.description}
              </p>
            )}
          </div>

          {/* Status */}
          <div className="form-group">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="form-select"
              value={form.status}
              onChange={handleChange}
              disabled={submitting}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={handleReset}
              disabled={submitting}
            >
              Reset
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/')}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
