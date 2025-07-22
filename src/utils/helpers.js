import { format, isToday, isTomorrow, isYesterday } from 'date-fns';
import { vi } from 'date-fns/locale';

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatDate = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  
  if (isToday(dateObj)) {
    return 'Hôm nay';
  }
  
  if (isTomorrow(dateObj)) {
    return 'Ngày mai';
  }
  
  if (isYesterday(dateObj)) {
    return 'Hôm qua';
  }
  
  return format(dateObj, 'dd/MM/yyyy', { locale: vi });
};

export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  const today = new Date();
  const due = new Date(dueDate);
  return due < today && !isToday(due);
};

export const sortTodosByPriority = (todos) => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  return [...todos].sort((a, b) => {
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};

export const filterTodos = (todos, filter) => {
  switch (filter) {
    case 'completed':
      return todos.filter(todo => todo.completed);
    case 'pending':
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
  }
};

export const getCompletionStats = (todos) => {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const pending = total - completed;
  
  return {
    total,
    completed,
    pending,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
};