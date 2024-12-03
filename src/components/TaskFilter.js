import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../features/taskSlice';
import { Button, Box, Typography, Paper } from '@mui/material';

const TaskFilter = () => {
  const dispatch = useDispatch();

  return (
    <Paper
      elevation={3}
      style={{
        padding: '20px',
        borderRadius: '15px',
        backgroundColor: '#f9f9f9', // Light background for a fresh, clean look
        marginBottom: '30px',
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        marginBottom={4}
      >
        <Typography
          variant="h6"
          component="div"
          marginBottom={2}
          color="textSecondary"
          style={{
            fontWeight: 600,
            fontSize: '18px',
          }}
        >
          <strong>Filter Tasks</strong>
        </Typography>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          gap="12px" // Adds consistent space between buttons
        >
          {['all', 'completed', 'pending', 'overdue'].map((filter) => (
            <Button
              key={filter}
              onClick={() => dispatch(setFilter(filter))}
              variant="contained"
              color="primary"
              style={{
                margin: '8px',
                borderRadius: '30px',
                padding: '10px 30px',
                fontWeight: '600',
                fontSize: '16px',
                textTransform: 'capitalize',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow for subtle depth
                backgroundColor: '#4caf50', // Lighter green for a fresh feel
              }}
              sx={{
                '&:hover': {
                  backgroundColor: '#388e3c', // Darker green for hover
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                },
                '&:focus': {
                  outline: 'none',
                  transform: 'scale(1.05)',
                },
              }}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks
            </Button>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default TaskFilter;
