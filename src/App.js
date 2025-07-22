import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { TodoProvider } from './contexts/TodoContext';
import { Layout, TodoForm, TodoFilter, TodoList } from './components';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TodoProvider>
        <Layout>
          <TodoForm />
          <TodoFilter />
          <TodoList />
        </Layout>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;