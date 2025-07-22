import { useMemo } from 'react';
import { useTodoContext } from '../contexts/TodoContext';
import { filterTodos, sortTodosByPriority, getCompletionStats } from '../utils/helpers';

export const useTodos = () => {
  const { todos, filter, searchQuery } = useTodoContext();

  const filteredAndSortedTodos = useMemo(() => {
    let result = todos;

    // Apply search filter
    if (searchQuery) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    result = filterTodos(result, filter);

    // Sort by priority
    result = sortTodosByPriority(result);

    return result;
  }, [todos, filter, searchQuery]);

  const stats = useMemo(() => getCompletionStats(todos), [todos]);

  return {
    todos: filteredAndSortedTodos,
    allTodos: todos,
    stats,
  };
};