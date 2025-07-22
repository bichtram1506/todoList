import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Typography,
  Grid,
  Modal,
  IconButton,
  Fade,
  Backdrop,
  useTheme,
} from '@mui/material';
import {
  Add,
  Clear,
  Assignment,
  CalendarToday,
  Flag,
  Close,
} from '@mui/icons-material';
import { useTodoContext } from '../../contexts/TodoContext';
import { PRIORITY_LEVELS, PRIORITY_LABELS } from '../../utils/constants';

const TodoForm = () => {
  const theme = useTheme();
  const { addTodo } = useTodoContext();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: PRIORITY_LEVELS.MEDIUM,
    dueDate: '',
  });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.title.trim()) return;

    addTodo({
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate || null,
    });

    setFormData({
      title: '',
      description: '',
      priority: PRIORITY_LEVELS.MEDIUM,
      dueDate: '',
    });
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clearForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: PRIORITY_LEVELS.MEDIUM,
      dueDate: '',
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      case 'low':
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          mb: 4,
          border: `1px solid ${theme.palette.divider}`,
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: theme.shadows[4],
            transform: 'translateY(-2px)',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            cursor: 'pointer',
            borderRadius: '16px',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.primary.main}08 100%)`,
            },
          }}
          onClick={handleOpen}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              color: 'white',
              boxShadow: theme.shadows[2],
            }}
          >
            <Add sx={{ fontSize: 24 }} />
          </Box>
          <Box sx={{ ml: 2, flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 0.5,
              }}
            >
              Thêm công việc mới
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.875rem',
              }}
            >
              Nhấn để mở form nhập liệu
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
              },
            }}
          >
            Tạo mới
          </Button>
        </Box>
      </Paper>

      {/* Modal Form */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: '600px', md: '700px' },
              maxWidth: '95vw',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
          >
            <Paper
              elevation={24}
              sx={{
                borderRadius: 4,
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                },
              }}
            >
              {/* Modal Header */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 3,
                  pb: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 56,
                      height: 56,
                      borderRadius: '16px',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      color: 'white',
                      boxShadow: theme.shadows[4],
                    }}
                  >
                    <Assignment sx={{ fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        mb: 0.5,
                      }}
                    >
                      Tạo công việc mới
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                      }}
                    >
                      Điền thông tin để thêm công việc vào danh sách
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={handleClose}
                  sx={{
                    background: theme.palette.action.hover,
                    '&:hover': {
                      background: theme.palette.action.selected,
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <Close />
                </IconButton>
              </Box>

              {/* Modal Content */}
              <Box sx={{ px: 3, pb: 3 }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Tiêu đề công việc"
                        value={formData.title}
                        onChange={handleChange('title')}
                        required
                        autoFocus
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <Assignment
                              sx={{
                                color: theme.palette.text.secondary,
                                mr: 1,
                                ml: 1,
                              }}
                            />
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: theme.palette.background.paper,
                            '&:hover fieldset': {
                              borderColor: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Mô tả (tùy chọn)"
                        value={formData.description}
                        onChange={handleChange('description')}
                        multiline
                        rows={3}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: theme.palette.background.paper,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Mức độ ưu tiên</InputLabel>
                        <Select
                          value={formData.priority}
                          onChange={handleChange('priority')}
                          label="Mức độ ưu tiên"
                          startAdornment={
                            <Flag
                              sx={{
                                color: getPriorityColor(formData.priority),
                                ml: 1,
                                mr: 1,
                              }}
                            />
                          }
                          sx={{
                            borderRadius: 2,
                            backgroundColor: theme.palette.background.paper,
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderRadius: 2,
                            },
                          }}
                        >
                          {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                            <MenuItem key={value} value={value}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Flag
                                  sx={{
                                    color: getPriorityColor(value),
                                    fontSize: 16,
                                  }}
                                />
                                {label}
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Ngày hạn"
                        type="date"
                        value={formData.dueDate}
                        onChange={handleChange('dueDate')}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          startAdornment: (
                            <CalendarToday
                              sx={{
                                color: theme.palette.text.secondary,
                                mr: 1,
                                ml: 1,
                                fontSize: 20,
                              }}
                            />
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: theme.palette.background.paper,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'flex-end' }}>
                        <Button
                          variant="outlined"
                          size="large"
                          startIcon={<Clear />}
                          onClick={clearForm}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3,
                            py: 1.5,
                            borderWidth: 2,
                            '&:hover': {
                              borderWidth: 2,
                            },
                          }}
                        >
                          Xóa form
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          startIcon={<Add />}
                          disabled={!formData.title.trim()}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 4,
                            py: 1.5,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                            boxShadow: theme.shadows[3],
                            '&:hover': {
                              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                              transform: 'translateY(-1px)',
                              boxShadow: theme.shadows[6],
                            },
                            '&:disabled': {
                              background: theme.palette.action.disabledBackground,
                            },
                          }}
                        >
                          Thêm công việc
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default TodoForm;