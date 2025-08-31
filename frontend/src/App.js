import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import { todoAPI } from './services/api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await todoAPI.getTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to load todos. Please try again.');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const newTodo = await todoAPI.createTodo(todoData);
      setTodos(prev => [newTodo, ...prev]);
      return true;
    } catch (err) {
      setError('Failed to create todo. Please try again.');
      console.error('Error creating todo:', err);
      return false;
    }
  };

  const handleUpdateTodo = async (id, updates) => {
    try {
      const updatedTodo = await todoAPI.updateTodo(id, updates);
      setTodos(prev => 
        prev.map(todo => todo.id === id ? updatedTodo : todo)
      );
      return true;
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error updating todo:', err);
      return false;
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoAPI.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
      return false;
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const updatedTodo = await todoAPI.toggleComplete(id);
      setTodos(prev => 
        prev.map(todo => todo.id === id ? updatedTodo : todo)
      );
      return true;
    } catch (err) {
      setError('Failed to toggle todo. Please try again.');
      console.error('Error toggling todo:', err);
      return false;
    }
  };

  // Filter todos based on completion status and priority
  const filteredTodos = todos.filter(todo => {
    const statusMatch = 
      filter === 'all' || 
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed);
    
    const priorityMatch = 
      priorityFilter === 'all' || 
      todo.priority === priorityFilter;

    return statusMatch && priorityMatch;
  });

  const todoStats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  };

  if (loading) {
    return (
      <div className="app">
        <div className="container">
          <div className="loading">Loading todos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <Header stats={todoStats} />
        
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)} className="error-close">×</button>
          </div>
        )}

        <div className="main-content">
          <div className="todo-form-section">
            <TodoForm onAddTodo={handleAddTodo} />
          </div>

          <div className="todo-list-section">
            <FilterBar
              filter={filter}
              priorityFilter={priorityFilter}
              onFilterChange={setFilter}
              onPriorityFilterChange={setPriorityFilter}
              stats={todoStats}
            />
            
            <TodoList
              todos={filteredTodos}
              onUpdateTodo={handleUpdateTodo}
              onDeleteTodo={handleDeleteTodo}
              onToggleComplete={handleToggleComplete}
            />

            {filteredTodos.length === 0 && (
              <div className="empty-state">
                {filter === 'all' ? 
                  'No todos yet. Create your first todo above!' :
                  `No ${filter} todos found.`
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
