import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { LOCAL_STORAGE_KEY } from '../utils/constants';
import { generateId } from '../utils/helpers';

const TodoContext = createContext();

const initialState = {
  todos: [],
  filter: 'all',
  searchQuery: '',
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, todos: action.payload };
    
    case 'ADD_TODO':
      const newTodo = {
        id: generateId(),
        title: action.payload.title,
        description: action.payload.description || '',
        priority: action.payload.priority || 'medium',
        dueDate: action.payload.dueDate || null,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return { ...state, todos: [...state.todos, newTodo] };
    
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : todo
        ),
      };
    
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
            : todo
        ),
      };
    
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTodos) {
      dispatch({ type: 'SET_TODOS', payload: JSON.parse(savedTodos) });
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.todos));
  }, [state.todos]);

  const addTodo = (todoData) => {
    dispatch({ type: 'ADD_TODO', payload: todoData });
  };

  const updateTodo = (id, updates) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, updates } });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSearchQuery = (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const value = {
    ...state,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    setFilter,
    setSearchQuery,
    clearCompleted,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};