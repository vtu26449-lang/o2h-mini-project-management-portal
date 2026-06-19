import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import FilterBar from '../components/FilterBar';
import Spinner from '../components/Spinner';
import EmptyState from '../components/EmptyState';
import { fetchTasks, updateTaskStatus, deleteTask } from '../services/taskService';
import './Dashboard.css';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]); // for counts
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMsg, setActionMsg] = useState('');

  // Load all tasks (for counts) and filtered tasks
  const loadTasks = useCallback(async (filter) => {
    try {
      setLoading(true);
      setError('');
      const [filteredRes, allRes] = await Promise.all([
        fetchTasks(filter),
        fetchTasks('All'),
      ]);
      setTasks(filteredRes.data);
      setAllTasks(allRes.data);
    } catch (err) {
      setError('Failed to load tasks. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks(activeFilter);
  }, [activeFilter, loadTasks]);

  // Compute counts for filter bar
  const counts = {
    All: allTasks.length,
    Pending: allTasks.filter((t) => t.status === 'Pending').length,
    'In Progress': allTasks.filter((t) => t.status === 'In Progress').length,
    Completed: allTasks.filter((t) => t.status === 'Completed').length,
  };

  const showMessage = (msg) => {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(''), 3000);
  };

  const handleComplete = async (id) => {
    try {
      await updateTaskStatus(id, 'Completed');
      showMessage('Task marked as completed!');
      loadTasks(activeFilter);
    } catch (err) {
      setError('Failed to update task. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(id);
      showMessage('Task deleted successfully.');
      loadTasks(activeFilter);
    } catch (err) {
      setError('Failed to delete task. Please try again.');
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Manage and track your project tasks</p>
        </div>
        <Link to="/add-task" className="btn-add-task">
          + Add Task
        </Link>
      </div>

      {/* Stats Row */}
      <div className="stats-row" aria-label="Task statistics">
        <div className="stat-card">
          <span className="stat-number">{allTasks.length}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-card stat-pending">
          <span className="stat-number">{counts.Pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card stat-inprogress">
          <span className="stat-number">{counts['In Progress']}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card stat-completed">
          <span className="stat-number">{counts.Completed}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      {/* Action feedback */}
      {actionMsg && (
        <div className="alert alert-success" role="alert" aria-live="polite">
          {actionMsg}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="alert alert-error" role="alert" aria-live="assertive">
          {error}
          <button className="alert-close" onClick={() => setError('')} aria-label="Dismiss error">
            ×
          </button>
        </div>
      )}

      {/* Filter Bar */}
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={counts}
      />

      {/* Task Grid */}
      {loading ? (
        <Spinner message="Loading tasks..." />
      ) : tasks.length === 0 ? (
        <EmptyState filter={activeFilter} />
      ) : (
        <div className="task-grid" aria-label="Task list">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
