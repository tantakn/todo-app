import React, { useState } from 'react';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { 
  FaCheck, 
  FaEdit, 
  FaTrash, 
  FaSave, 
  FaTimes, 
  FaCalendarAlt,
  FaExclamationTriangle,
  FaFlag
} from 'react-icons/fa';
import './TodoItem.css';

const TodoItem = ({ todo, onUpdate, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || '',
    priority: todo.priority
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority
    });
  };

  const handleSave = async () => {
    if (!editData.title.trim()) return;

    const success = await onUpdate(todo.id, {
      title: editData.title.trim(),
      description: editData.description.trim() || null,
      priority: editData.priority
    });

    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo.id);
    }
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    
    if (isToday(date)) {
      return { text: 'Today', className: 'due-today' };
    } else if (isTomorrow(date)) {
      return { text: 'Tomorrow', className: 'due-tomorrow' };
    } else if (isPast(date)) {
      return { text: format(date, 'MMM dd'), className: 'due-overdue' };
    } else {
      return { text: format(date, 'MMM dd'), className: 'due-future' };
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <FaExclamationTriangle />;
      case 'medium': return <FaFlag />;
      case 'low': return <FaFlag />;
      default: return <FaFlag />;
    }
  };

  const dueDate = formatDueDate(todo.due_date);

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-main">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`toggle-button ${todo.completed ? 'checked' : ''}`}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed && <FaCheck />}
        </button>

        <div className="todo-content">
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                className="edit-input title-input"
                placeholder="Todo title..."
                autoFocus
              />
              <textarea
                value={editData.description}
                onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                className="edit-input description-input"
                placeholder="Description..."
                rows="2"
              />
              <select
                value={editData.priority}
                onChange={(e) => setEditData(prev => ({ ...prev, priority: e.target.value }))}
                className="edit-select"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          ) : (
            <div className="todo-info">
              <h3 className="todo-title">{todo.title}</h3>
              {todo.description && (
                <p className="todo-description">{todo.description}</p>
              )}
              
              <div className="todo-meta">
                <div className={`priority-badge ${getPriorityClass(todo.priority)}`}>
                  {getPriorityIcon(todo.priority)}
                  <span>{todo.priority}</span>
                </div>
                
                {dueDate && (
                  <div className={`due-date ${dueDate.className}`}>
                    <FaCalendarAlt />
                    <span>{dueDate.text}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="todo-actions">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="action-button save-button"
                disabled={!editData.title.trim()}
                aria-label="Save changes"
              >
                <FaSave />
              </button>
              <button
                onClick={handleCancel}
                className="action-button cancel-button"
                aria-label="Cancel editing"
              >
                <FaTimes />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="action-button edit-button"
                aria-label="Edit todo"
              >
                <FaEdit />
              </button>
              <button
                onClick={handleDelete}
                className="action-button delete-button"
                aria-label="Delete todo"
              >
                <FaTrash />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
