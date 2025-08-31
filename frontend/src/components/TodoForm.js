import React, { useState } from 'react';
import { FaPlus, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TodoForm.css';

const TodoForm = ({ onAddTodo }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    due_date: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    const todoData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim() || null,
      due_date: formData.due_date ? formData.due_date.toISOString() : null
    };

    const success = await onAddTodo(todoData);
    
    if (success) {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        due_date: null
      });
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      due_date: date
    }));
  };

  return (
    <div className="todo-form-container">
      <h2 className="form-title">Add New Task</h2>
      
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            className="form-input"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add some details..."
            className="form-textarea"
            rows="3"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-select"
              disabled={isSubmitting}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              <FaCalendarAlt className="label-icon" />
              Due Date
            </label>
            <DatePicker
              selected={formData.due_date}
              onChange={handleDateChange}
              placeholderText="Select date..."
              className="form-input date-input"
              dateFormat="MMM dd, yyyy"
              minDate={new Date()}
              isClearable
              disabled={isSubmitting}
            />
          </div>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={!formData.title.trim() || isSubmitting}
        >
          <FaPlus className="button-icon" />
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
