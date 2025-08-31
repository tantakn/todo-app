import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onUpdateTodo, onDeleteTodo, onToggleComplete }) => {
  if (todos.length === 0) {
    return null;
  }

  return (
    <div className="todo-list">
      <div className="todo-items">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={onUpdateTodo}
            onDelete={onDeleteTodo}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
