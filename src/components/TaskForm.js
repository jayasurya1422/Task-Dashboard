import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../features/taskSlice';

const TaskForm = ({ taskToEdit, open, onClose }) => {
  const dispatch = useDispatch();

  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    completed: false,
  });

  // Set the task data when editing a task
  useEffect(() => {
    if (taskToEdit) {
      setTask({
        title: taskToEdit.title,
        description: taskToEdit.description,
        dueDate: taskToEdit.dueDate,
        completed: taskToEdit.completed,
      });
    } else {
      setTask({
        title: '',
        description: '',
        dueDate: '',
        completed: false,
      });
    }
  }, [taskToEdit]);

  const handleSubmit = () => {
    if (task.title && task.dueDate) {
      if (taskToEdit) {
        // Dispatch the edit task action if taskToEdit is present
        dispatch(editTask({ ...task, id: taskToEdit.id }));
      } else {
        // Dispatch the add task action if taskToEdit is null
        dispatch(addTask({ ...task, id: Date.now() }));
      }
      setTask({ title: '', description: '', dueDate: '', completed: false });
      onClose(); // Close the form after submitting
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        {taskToEdit ? 'Edit Task' : 'Add Task'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Task Title"
              fullWidth
              margin="normal"
              variant="outlined"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              InputLabelProps={{
                shrink: true,
                style: { fontSize: '1.2rem', fontWeight: 'bold' }, // Increased label size and bold font
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              variant="outlined"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              InputLabelProps={{
                shrink: true,
                style: { fontSize: '1.2rem', fontWeight: 'bold' }, // Increased label size and bold font
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Due Date"
              type="date"
              fullWidth
              margin="normal"
              variant="outlined"
              value={task.dueDate}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
              InputLabelProps={{
                shrink: true,
                style: { fontSize: '1.2rem', fontWeight: 'bold' }, // Increased label size and bold font
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={onClose} color="error" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          sx={{ ml: 2 }}
        >
          {taskToEdit ? 'Save Changes' : 'Add Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
