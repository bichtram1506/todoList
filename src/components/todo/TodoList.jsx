import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Fade,
  useTheme,
  Avatar,
  Stack,
} from '@mui/material';
import {
  Assignment,
  CheckCircle,
  PlaylistAddCheck,
  TrendingUp,
  Inbox,
  Star,
} from '@mui/icons-material';
import TodoItem from './TodoItem';
import { useTodos } from '../../hooks/useTodos';

const TodoList = () => {
  const theme = useTheme();
  const { todos } = useTodos();

  // Calculate statistics
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = todos.length - completedTodos;
  const completionPercentage = todos.length > 0 ? Math.round((completedTodos / todos.length) * 100) : 0;
  
  // Separate todos by status
  const pendingTodosList = todos.filter(todo => !todo.completed);
  const completedTodosList = todos.filter(todo => todo.completed);

  if (todos.length === 0) {
    return (
      <Fade in timeout={600}>
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 4,
            background: `linear-gradient(135deg, 
              ${theme.palette.background.paper} 0%, 
              ${theme.palette.grey[50]} 100%)`,
            border: `2px dashed ${theme.palette.primary.main}40`,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            },
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}20 0%, ${theme.palette.secondary.main}20 100%)`,
              mb: 3,
            }}
          >
            <Inbox sx={{ fontSize: 48, color: theme.palette.primary.main }} />
          </Box>
          
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 1,
            }}
          >
            Chưa có công việc nào
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: theme.palette.text.secondary,
              maxWidth: 400,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Bắt đầu hành trình quản lý thời gian hiệu quả bằng cách thêm công việc đầu tiên của bạn!
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <Chip
              icon={<PlaylistAddCheck />}
              label="Nhấn nút 'Thêm công việc mới' ở trên"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
                color: theme.palette.primary.main,
                fontWeight: 600,
                py: 2,
                px: 1,
                '& .MuiChip-icon': {
                  color: theme.palette.primary.main,
                },
              }}
            />
          </Box>
        </Paper>
      </Fade>
    );
  }

  return (
    <Box>
      {/* Statistics Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            transform: 'translate(50%, -50%)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Assignment sx={{ fontSize: 28, color: 'white' }} />
            </Avatar>
            <Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 700,
                  mb: 0.5,
                }}
              >
                Danh sách công việc
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  opacity: 0.9,
                  fontSize: '0.875rem',
                }}
              >
                Tổng quan tiến độ và quản lý hiệu quả
              </Typography>
            </Box>
          </Box>
          
          <Stack direction="row" spacing={1.5}>
            <Chip
              icon={<Assignment />}
              label={`${todos.length} việc`}
              sx={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                fontWeight: 600,
                '& .MuiChip-icon': { color: 'rgba(255, 255, 255, 0.9)' },
              }}
            />
            
            <Chip
              icon={<CheckCircle />}
              label={`${completedTodos}/${todos.length}`}
              sx={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                fontWeight: 600,
                '& .MuiChip-icon': { color: 'rgba(255, 255, 255, 0.9)' },
              }}
            />
            
            {completionPercentage > 0 && (
              <Chip
                icon={<TrendingUp />}
                label={`${completionPercentage}%`}
                sx={{
                  background: completionPercentage === 100 
                    ? `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`
                    : 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  fontWeight: 600,
                  '& .MuiChip-icon': { color: 'white' },
                }}
              />
            )}
            
            {completionPercentage === 100 && (
              <Chip
                icon={<Star />}
                label="Hoàn thành!"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
                  color: 'white',
                  fontWeight: 600,
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                    '100%': { transform: 'scale(1)' },
                  },
                  '& .MuiChip-icon': { color: 'white' },
                }}
              />
            )}
          </Stack>
        </Box>
      </Paper>

      {/* Pending Todos Section */}
      {pendingTodosList.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              p: 2,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.warning.main}10 0%, ${theme.palette.warning.main}05 100%)`,
              border: `1px solid ${theme.palette.warning.main}20`,
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
                mr: 2,
              }}
            >
              <Assignment sx={{ fontSize: 18, color: 'white' }} />
            </Avatar>
            
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: theme.palette.text.primary,
                flexGrow: 1,
              }}
            >
              Cần hoàn thành
            </Typography>
            
            <Chip
              label={`${pendingTodos} việc`}
              size="small"
              sx={{
                background: theme.palette.warning.main,
                color: 'white',
                fontWeight: 600,
              }}
            />
          </Box>

          <Stack spacing={2}>
            {pendingTodosList.map((todo, index) => (
              <Fade in timeout={400 + index * 100} key={todo.id}>
                <Box>
                  <TodoItem todo={todo} />
                </Box>
              </Fade>
            ))}
          </Stack>
        </Box>
      )}

      {/* Completed Todos Section */}
      {completedTodosList.length > 0 && (
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              p: 2,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.success.main}10 0%, ${theme.palette.success.main}05 100%)`,
              border: `1px solid ${theme.palette.success.main}20`,
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                mr: 2,
              }}
            >
              <CheckCircle sx={{ fontSize: 18, color: 'white' }} />
            </Avatar>
            
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: theme.palette.text.primary,
                flexGrow: 1,
              }}
            >
              Đã hoàn thành
            </Typography>
            
            <Chip
              label={`${completedTodos} việc`}
              size="small"
              sx={{
                background: theme.palette.success.main,
                color: 'white',
                fontWeight: 600,
              }}
            />
          </Box>

          <Stack spacing={2}>
            {completedTodosList.map((todo, index) => (
              <Fade in timeout={600 + index * 100} key={todo.id}>
                <Box sx={{ opacity: 0.7 }}>
                  <TodoItem todo={todo} />
                </Box>
              </Fade>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default TodoList;