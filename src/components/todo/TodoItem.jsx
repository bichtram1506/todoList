import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Box,
  Chip,
  Collapse,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Delete,
  Edit,
  Save,
  Cancel,
  ExpandMore,
  ExpandLess,
  CalendarToday,
  Flag,
} from '@mui/icons-material';
import { useTodoContext } from '../../contexts/TodoContext';
import {
  PRIORITY_COLORS,
  PRIORITY_LABELS,
} from '../../utils/constants';
import { formatDate, isOverdue } from '../../utils/helpers';

const TodoItem = ({ todo }) => {
  const { updateTodo, deleteTodo, toggleTodo } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
    dueDate: todo.dueDate ? todo.dueDate.split('T')[0] : '',
  });

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
      deleteTodo(todo.id);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setExpanded(true);
  };

  const handleSave = () => {
    if (!editData.title.trim()) return;

    updateTodo(todo.id, {
      title: editData.title.trim(),
      description: editData.description.trim(),
      priority: editData.priority,
      dueDate: editData.dueDate || null,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      dueDate: todo.dueDate ? todo.dueDate.split('T')[0] : '',
    });
    setIsEditing(false);
  };

  const handleInputChange = (field) => (event) => {
    setEditData({
      ...editData,
      [field]: event.target.value,
    });
  };

  const isTaskOverdue = todo.dueDate && isOverdue(todo.dueDate);

  return (
    <Card
      sx={{
        mb: 2,
        opacity: todo.completed ? 0.7 : 1,
        borderLeft: `4px solid ${PRIORITY_COLORS[todo.priority]}`,
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Checkbox
            checked={todo.completed}
            onChange={handleToggle}
            color="primary"
            sx={{ mt: -1 }}
          />

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            {isEditing ? (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    value={editData.title}
                    onChange={handleInputChange('title')}
                    size="small"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    value={editData.description}
                    onChange={handleInputChange('description')}
                    placeholder="Mô tả"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Ưu tiên</InputLabel>
                    <Select
                      value={editData.priority}
                      onChange={handleInputChange('priority')}
                      label="Ưu tiên"
                    >
                      {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="date"
                    value={editData.dueDate}
                    onChange={handleInputChange('dueDate')}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    label="Ngày hạn"
                  />
                </Grid>
              </Grid>
            ) : (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    wordBreak: 'break-word',
                  }}
                >
                  {todo.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 1 }}>
                  <Chip
                    icon={<Flag />}
                    label={PRIORITY_LABELS[todo.priority]}
                    size="small"
                    sx={{
                      backgroundColor: PRIORITY_COLORS[todo.priority],
                      color: 'white',
                      '& .MuiChip-icon': {
                        color: 'white',
                      },
                    }}
                  />

                  {todo.dueDate && (
                    <Chip
                      icon={<CalendarToday />}
                      label={formatDate(todo.dueDate)}
                      size="small"
                      color={isTaskOverdue ? 'error' : 'default'}
                      variant={isTaskOverdue ? 'filled' : 'outlined'}
                    />
                  )}

                  {todo.description && (
                    <IconButton
                      size="small"
                      onClick={() => setExpanded(!expanded)}
                    >
                      {expanded ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  )}
                </Box>

                <Collapse in={expanded}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, whiteSpace: 'pre-wrap' }}
                  >
                    {todo.description}
                  </Typography>
                </Collapse>
              </>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {isEditing ? (
              <>
                <IconButton
                  size="small"
                  onClick={handleSave}
                  color="primary"
                  disabled={!editData.title.trim()}
                >
                  <Save />
                </IconButton>
                <IconButton size="small" onClick={handleCancel}>
                  <Cancel />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  size="small"
                  onClick={handleEdit}
                  disabled={todo.completed}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleDelete}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodoItem;