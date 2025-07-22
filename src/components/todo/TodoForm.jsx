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
  FormHelperText,
} from '@mui/material';
import {
  Add,
  Clear,
  Assignment,
  CalendarToday,
  Flag,
  Close,
} from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTodoContext } from '../../contexts/TodoContext';
import { PRIORITY_LEVELS, PRIORITY_LABELS } from '../../utils/constants';

// Validation Schema với Yup
const todoValidationSchema = Yup.object({
  title: Yup.string()
    .required('Tiêu đề công việc là bắt buộc')
    .min(3, 'Tiêu đề phải có ít nhất 3 ký tự')
    .max(100, 'Tiêu đề không được vượt quá 100 ký tự')
    .trim('Tiêu đề không được chứa khoảng trắng ở đầu/cuối'),
  
  description: Yup.string()
    .max(500, 'Mô tả không được vượt quá 500 ký tự')
    .trim(),
  
  priority: Yup.string()
    .oneOf(Object.values(PRIORITY_LEVELS), 'Mức độ ưu tiên không hợp lệ')
    .required('Vui lòng chọn mức độ ưu tiên'),
  
  dueDate: Yup.date()
    .nullable()
    .min(new Date(), 'Ngày hạn phải là ngày trong tương lai')
    .typeError('Ngày hạn không hợp lệ'),
});

const TodoForm = () => {
  const theme = useTheme();
  const { addTodo } = useTodoContext();
  const [open, setOpen] = useState(false);

  // Initial values cho Formik
  const initialValues = {
    title: '',
    description: '',
    priority: PRIORITY_LEVELS.MEDIUM,
    dueDate: '',
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    try {
      addTodo({
        title: values.title.trim(),
        description: values.description.trim(),
        priority: values.priority,
        dueDate: values.dueDate || null,
      });

      resetForm();
      setOpen(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setSubmitting(false);
    }
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

      {/* Modal Form với Formik */}
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

              {/* Modal Content với Formik */}
              <Box sx={{ px: 3, pb: 3 }}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={todoValidationSchema}
                  onSubmit={handleSubmit}
                  validateOnChange={true}
                  validateOnBlur={true}
                >
                  {({ values, errors, touched, handleChange, handleBlur, isSubmitting, resetForm, isValid }) => (
                    <Form>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="title"
                            label="Tiêu đề công việc"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title && errors.title}
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
                            name="description"
                            label="Mô tả (tùy chọn)"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.description && Boolean(errors.description)}
                            helperText={touched.description && errors.description}
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
                          <FormControl 
                            fullWidth 
                            error={touched.priority && Boolean(errors.priority)}
                          >
                            <InputLabel>Mức độ ưu tiên</InputLabel>
                            <Select
                              name="priority"
                              value={values.priority}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              label="Mức độ ưu tiên"
                              startAdornment={
                                <Flag
                                  sx={{
                                    color: getPriorityColor(values.priority),
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
                            {touched.priority && errors.priority && (
                              <FormHelperText>{errors.priority}</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            name="dueDate"
                            label="Ngày hạn"
                            type="date"
                            value={values.dueDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.dueDate && Boolean(errors.dueDate)}
                            helperText={touched.dueDate && errors.dueDate}
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
                              onClick={() => resetForm()}
                              disabled={isSubmitting}
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
                              disabled={isSubmitting || !isValid || !values.title.trim()}
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
                              {isSubmitting ? 'Đang thêm...' : 'Thêm công việc'}
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default TodoForm;