import React from 'react';
import { FaFilter } from 'react-icons/fa';
import './FilterBar.css';

const FilterBar = ({ 
  filter, 
  priorityFilter, 
  onFilterChange, 
  onPriorityFilterChange, 
  stats 
}) => {
  const filterOptions = [
    { value: 'all', label: 'All', count: stats.total },
    { value: 'active', label: 'Active', count: stats.active },
    { value: 'completed', label: 'Completed', count: stats.completed }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  return (
    <div className="filter-bar">
      <div className="filter-section">
        <div className="filter-group">
          <FaFilter className="filter-icon" />
          <span className="filter-label">Filter:</span>
          
          <div className="filter-buttons">
            {filterOptions.map(option => (
              <button
                key={option.value}
                onClick={() => onFilterChange(option.value)}
                className={`filter-button ${filter === option.value ? 'active' : ''}`}
              >
                {option.label}
                <span className="filter-count">{option.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="priority-filter">
          <select
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
            className="priority-select"
          >
            {priorityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
