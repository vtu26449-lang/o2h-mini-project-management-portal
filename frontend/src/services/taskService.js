import axios from 'axios';

// Base URL - uses proxy in development, or set REACT_APP_API_URL in production
const API_URL = process.env.REACT_APP_API_URL || '/api/tasks';

/**
 * Fetch all tasks, optionally filtered by status
 * @param {string} status - 'All' | 'Pending' | 'In Progress' | 'Completed'
 */
export const fetchTasks = async (status = 'All') => {
  const params = status !== 'All' ? { status } : {};
  const response = await axios.get(API_URL, { params });
  return response.data;
};

/**
 * Create a new task
 * @param {Object} taskData - { title, description, status }
 */
export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

/**
 * Update a task's status
 * @param {string} id - Task ID
 * @param {string} status - New status
 */
export const updateTaskStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/${id}`, { status });
  return response.data;
};

/**
 * Delete a task
 * @param {string} id - Task ID
 */
export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
