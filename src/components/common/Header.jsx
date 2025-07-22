import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Chip,
  useTheme,
  Avatar,
} from '@mui/material';
import {
  CheckCircle,
  Assignment,
  TrendingUp,
  Star,
} from '@mui/icons-material';
import { useTodos } from '../../hooks/useTodos';

const Header = () => {
  const theme = useTheme();
  const { stats } = useTodos();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        borderBottom: `1px solid ${theme.palette.primary.light}`,
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
          <Avatar
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
              mr: 2,
              width: 40,
              height: 40,
            }}
          >
            <Assignment sx={{ fontSize: 20 }} />
          </Avatar>
          <Box>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.2,
              }}
            >
              Todo List Pro
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.75rem',
              }}
            >
              Quản lý công việc thông minh
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Chip
            icon={<CheckCircle sx={{ fontSize: 18 }} />}
            label={`${stats.completed}/${stats.total}`}
            sx={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.875rem',
              height: 36,
              '& .MuiChip-icon': {
                color: 'rgba(255, 255, 255, 0.9)',
              },
              '& .MuiChip-label': {
                px: 1.5,
              },
            }}
          />

          {stats.percentage > 0 && (
            <Chip
              icon={<TrendingUp sx={{ fontSize: 18 }} />}
              label={`${stats.percentage}%`}
              sx={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.875rem',
                height: 36,
                '& .MuiChip-icon': {
                  color: 'rgba(255, 255, 255, 0.9)',
                },
                '& .MuiChip-label': {
                  px: 1.5,
                },
              }}
            />
          )}

          {stats.percentage === 100 && stats.total > 0 && (
            <Chip
              icon={<Star sx={{ fontSize: 18 }} />}
              label="Hoàn thành!"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                color: 'white',
                fontWeight: 600,
                fontSize: '0.875rem',
                height: 36,
                '& .MuiChip-icon': {
                  color: 'white',
                },
                '& .MuiChip-label': {
                  px: 1.5,
                },
              }}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;