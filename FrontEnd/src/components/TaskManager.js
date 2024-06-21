// src/components/TaskManager.js

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Modal } from './Modal';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskDetails, setTaskDetails] = useState({ title: '', description: '', dueDate: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Component mounted, fetching tasks...');
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      console.log('Fetching tasks...');
      const response = await fetch("http://localhost:8080/tasks");
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const result = await response.json();
      console.log('Fetched tasks:', result);
      setTasks(result);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddOrEditTask = async () => {
    console.log('Adding or editing task...');
    if (!taskDetails.title || !taskDetails.dueDate) {
      setError('Title and Due Date are required.');
      console.log('Error:', 'Title and Due Date are required.');
      return;
    }

    const requestOptions = {
      method: isEditing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskDetails),
    };

    const url = isEditing
      ? `http://localhost:8080/tasks/${selectedTask.id}`
      : "http://localhost:8080/tasks";

    try {
      console.log('Sending request to:', url);
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error('Failed to add or edit task');
      }
      const result = await response.json();
      console.log('Task added or edited:', result);
      fetchTasks();
    } catch (error) {
      console.error("Error adding or editing task:", error);
    }

    setTaskDetails({ title: '', description: '', dueDate: '' });
    setSelectedTask(null);
    setIsEditing(false);
    setShowModal(false);
    setError('');
  };

  const handleEditTask = (task) => {
    console.log('Editing task:', task);
    setIsEditing(true);
    setTaskDetails({ title: task.title, description: task.description, dueDate: task.dueDate });
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = async (id) => {
    console.log('Deleting task with ID:', id);
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response = await fetch(`http://localhost:8080/tasks/${id}`, requestOptions);
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      const result = await response.json();
      console.log('Task deleted:', result);
      window.location.reload(); // Reload the page after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }

    window.location.reload();
  };

  const handleSelectTask = (task) => {
    console.log('Viewing task:', task);
    setSelectedTask(task);
    setIsEditing(false);
    setShowModal(true);
    console.log(task); // Log task details to the console
  };

  const handleSearch = (e) => {
    console.log('Searching for tasks with ID:', e.target.value);
    setSearchTerm(e.target.value);
  };

  const filteredTasks = tasks.filter(task => task.id.toString().includes(searchTerm));
  console.log('Filtered tasks:', filteredTasks);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by ID"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <button onClick={() => { console.log('Opening modal to add new task'); setShowModal(true); setIsEditing(false); setSelectedTask(null); }} className="p-2 bg-blue-500 text-white rounded">
          Add Task
        </button>
      </div>
      <ul className="space-y-2">
        {filteredTasks.map(task => (
          <li key={task.id} className="p-4 border border-gray-300 rounded flex justify-between items-center">
            <span>{task.id}. {task.title}</span>
            <div>
              <button onClick={() => handleEditTask(task)} className="p-2 text-yellow-500"><FiEdit /></button>
              <button onClick={() => handleDeleteTask(task.id)} className="p-2 text-red-500"><FiTrash2 /></button>
              <button onClick={() => handleSelectTask(task)} className="p-2 text-blue-500">View</button>
            </div>
          </li>
        ))}
      </ul>
      {showModal && (
        <Modal onClose={() => { console.log('Closing modal'); setShowModal(false); }}>
          {selectedTask && !isEditing ? (
            <div>
              <h2 className="text-2xl font-bold mb-2">View Task</h2>
              <p><strong>Title:</strong> {selectedTask.title}</p>
              <p><strong>Description:</strong> {selectedTask.description}</p>
              <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-2">{isEditing ? 'Edit Task' : 'Add Task'}</h2>
              {error && <p className="text-red-500">{error}</p>}
              <input
                type="text"
                placeholder="Title"
                value={taskDetails.title}
                onChange={(e) => setTaskDetails({ ...taskDetails, title: e.target.value })}
                className="p-2 border border-gray-300 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Description"
                value={taskDetails.description}
                onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })}
                className="p-2 border border-gray-300 rounded mb-2"
              />
              <input
                type="date"
                value={taskDetails.dueDate}
                onChange={(e) => setTaskDetails({ ...taskDetails, dueDate: e.target.value })}
                className="p-2 border border-gray-300 rounded mb-2"
              />
              <button onClick={handleAddOrEditTask} className="p-2 bg-blue-500 text-white rounded">
                {isEditing ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default TaskManager;
