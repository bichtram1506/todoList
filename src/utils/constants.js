export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

export const PRIORITY_LABELS = {
  [PRIORITY_LEVELS.LOW]: 'Thấp',
  [PRIORITY_LEVELS.MEDIUM]: 'Trung bình',
  [PRIORITY_LEVELS.HIGH]: 'Cao',
};

export const PRIORITY_COLORS = {
  [PRIORITY_LEVELS.LOW]: '#4caf50',
  [PRIORITY_LEVELS.MEDIUM]: '#ff9800',
  [PRIORITY_LEVELS.HIGH]: '#f44336',
};

export const FILTER_OPTIONS = {
  ALL: 'all',
  PENDING: 'pending',
  COMPLETED: 'completed',
};

export const FILTER_LABELS = {
  [FILTER_OPTIONS.ALL]: 'Tất cả',
  [FILTER_OPTIONS.PENDING]: 'Chưa hoàn thành',
  [FILTER_OPTIONS.COMPLETED]: 'Đã hoàn thành',
};

export const LOCAL_STORAGE_KEY = 'todoList';