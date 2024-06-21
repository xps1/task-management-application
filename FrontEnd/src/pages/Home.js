import React, { useState } from 'react';
import { IconButton, TextField, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { Search, Edit, Delete, Add } from '@mui/icons-material';

const tasksData = [
  { id: 1, title: 'Get groceries', description: 'Buy milk, eggs, and bread.', dueDate: '2024-06-25' },
  { id: 2, title: 'Send a mail', description: 'Send the contract documents to the client.', dueDate: '2024-06-26' },
  // Add more tasks as needed
];

const Home = () => {
  const [tasks, setTasks] = useState(tasksData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedTask(null);
  };

  const handleOpenAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
    setNewTask({ title: '', description: '', dueDate: '' });
  };

  const handleOpenEditDialog = (task) => {
    setNewTask(task);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setNewTask({ title: '', description: '', dueDate: '' });
  };

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = () => {
    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
    handleCloseAddDialog();
  };

  const handleEditTask = () => {
    setTasks(tasks.map(task => task.id === newTask.id ? newTask : task));
    handleCloseEditDialog();
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id).map((task, index) => ({
      ...task,
      id: index + 1
    }));
    setTasks(updatedTasks);
  };

  return (
    <Box className="flex-grow p-4">
      <div className="bg-blue-500 mb-4 p-4 rounded shadow">
        <div className="flex justify-center">
          <h1 className="text-black text-2xl">Task Manager</h1>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center mb-4">
          <Search className="mr-2" />
          <TextField
            label="Search by ID"
            variant="outlined"
            margin="dense"
            onChange={handleSearchChange}
            fullWidth
            className="flex-1"
          />
        </div>
        <ul className="bg-white rounded shadow divide-y divide-gray-200">
          {tasks.filter(task => task.id.toString().includes(searchTerm)).map((task) => (
            <li key={task.id} className="p-4 flex justify-between items-center">
              <div onClick={() => handleTaskClick(task)} className="cursor-pointer flex-1">
                {`ID: ${task.id} - ${task.title}`}
              </div>
              <IconButton edge="end" aria-label="edit" onClick={() => handleOpenEditDialog(task)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                <Delete />
              </IconButton>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow"
        onClick={handleOpenAddDialog}
      >
        <Add />
      </button>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{selectedTask?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedTask?.description}</DialogContentText>
          <DialogContentText>Due Date: {selectedTask?.dueDate}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isAddDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            value={newTask.title}
            onChange={handleNewTaskChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            value={newTask.description}
            onChange={handleNewTaskChange}
          />
          <TextField
            margin="dense"
            name="dueDate"
            label="Due Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={newTask.dueDate}
            onChange={handleNewTaskChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddTask} color="primary">
            Add
          </Button>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            value={newTask.title}
            onChange={handleNewTaskChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            value={newTask.description}
            onChange={handleNewTaskChange}
          />
          <TextField
            margin="dense"
            name="dueDate"
            label="Due Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={newTask.dueDate}
            onChange={handleNewTaskChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditTask} color="primary">
            Save
          </Button>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
