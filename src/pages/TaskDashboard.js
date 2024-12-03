import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Button, Typography, Box, Container, Paper, Divider } from '@mui/material';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';

const TaskDashboard = () => {
  const { tasks, filter } = useSelector((state) => state.task);
  const [open, setOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    if (filter === 'overdue') return new Date(task.dueDate) < new Date();
    return true;
  });

  const handleOpenForm = () => {
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
    setTaskToEdit(null);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setOpen(true);
  };

  return (
    <Container maxWidth="lg" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <Typography variant="h3" gutterBottom align="center" style={{ fontWeight: 600, color: '#333' }}>
        Task Dashboard
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={3}>
        <TaskFilter />
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenForm}
          style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '8px' }}
        >
          Add Task
        </Button>
      </Box>
      <Divider style={{ marginBottom: '20px' }} />
      <TaskForm open={open} onClose={handleCloseForm} taskToEdit={taskToEdit} />
      <Grid container spacing={3}>
        {filteredTasks.length === 0 ? (
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '30px', textAlign: 'center', background: '#f5f5f5' }}>
              <Typography variant="h5" style={{ fontWeight: 500, color: '#888' }}>
                No Tasks Available
              </Typography>
            </Paper>
          </Grid>
        ) : (
          filteredTasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <TaskCard task={task} onEdit={handleEditTask} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default TaskDashboard;
