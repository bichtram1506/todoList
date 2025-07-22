import React from 'react';
import {
  Box,
  TextField,
  Chip,
  Button,
  Typography,
  Divider,
} from '@mui/material';
import {
  Search,
  ClearAll,
  FilterList,
} from '@mui/icons-material';
import { useTodoContext } from '../../contexts/TodoContext';
import { useTodos } from '../../hooks/useTodos';
import {  FILTER_LABELS } from '../../utils/constants';

const TodoFilter = () => {
  const {
    filter,
    searchQuery,
    setFilter,
    setSearchQuery,
    clearCompleted,
  } = useTodoContext();
  const { stats } = useTodos();

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearCompleted = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả công việc đã hoàn thành?')) {
      clearCompleted();
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Tìm kiếm công việc..."
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
        }}
        sx={{ mb: 2 }}
      />

      {/* Filter Chips */}
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        <FilterList sx={{ color: 'text.secondary', mr: 1 }} />
        {Object.entries(FILTER_LABELS).map(([value, label]) => (
          <Chip
            key={value}
            label={label}
            onClick={() => handleFilterChange(value)}
            color={filter === value ? 'primary' : 'default'}
            variant={filter === value ? 'filled' : 'outlined'}
            clickable
          />
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Stats and Actions */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
      }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Tổng: <strong>{stats.total}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Hoàn thành: <strong>{stats.completed}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Còn lại: <strong>{stats.pending}</strong>
          </Typography>
        </Box>

        {stats.completed > 0 && (
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            startIcon={<ClearAll />}
            onClick={handleClearCompleted}
          >
            Xóa đã hoàn thành
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TodoFilter;