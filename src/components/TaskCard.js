import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardActions, Button, Typography, IconButton, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { toggleTaskCompletion, deleteTask } from '../features/taskSlice';

const TaskCard = ({ task, onEdit }) => {
  const dispatch = useDispatch();

  return (
    <Card
      variant="outlined"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '15px',
        borderRadius: '16px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      sx={{
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <CardContent style={{ paddingBottom: '16px' }}>
        <Typography
          variant="h6"
          component="div"
          color="textPrimary"
          style={{
            fontWeight: 600,
            fontSize: '1.2rem',
            marginBottom: '8px',
            color: '#333',
          }}
        >
          {task.title}
        </Typography>

        <Typography
          color="textSecondary"
          variant="body2"
          paragraph
          style={{
            fontSize: '1rem',
            lineHeight: 1.6,
            color: '#666',
          }}
        >
          {task.description}
        </Typography>

        <Typography
          color="textSecondary"
          variant="body2"
          style={{
            fontSize: '0.9rem',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </Typography>
      </CardContent>

      <CardActions
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '8px',
          paddingBottom: '16px',
        }}
      >
        <Button
          variant="contained"
          color={task.completed ? 'secondary' : 'primary'}
          onClick={() => dispatch(toggleTaskCompletion(task.id))}
          style={{
            borderRadius: '30px',
            textTransform: 'capitalize',
            fontWeight: 600,
            fontSize: '0.9rem',
            padding: '8px 24px',
            boxShadow: task.completed ? '0 2px 4px rgba(0, 0, 0, 0.1)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease',
          }}
          sx={{
            '&:hover': {
              boxShadow: task.completed
                ? '0 4px 6px rgba(0, 0, 0, 0.2)'
                : '0 6px 12px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
        </Button>

        <Box>
          <IconButton
            onClick={() => onEdit(task)}
            color="primary"
            style={{
              marginRight: '12px',
              transition: 'transform 0.3s ease, color 0.3s ease',
            }}
            sx={{
              '&:hover': {
                transform: 'scale(1.1)',
                color: '#1976d2',
              },
            }}
          >
            <Edit />
          </IconButton>

          <IconButton
            onClick={() => dispatch(deleteTask(task.id))}
            color="error"
            style={{
              transition: 'transform 0.3s ease, color 0.3s ease',
            }}
            sx={{
              '&:hover': {
                transform: 'scale(1.1)',
                color: '#d32f2f',
              },
            }}
          >
            <Delete />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
