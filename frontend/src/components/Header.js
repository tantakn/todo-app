import React from 'react';
import { FaCheckCircle, FaTasks, FaClock } from 'react-icons/fa';
import './Header.css';

const Header = ({ stats }) => {
  return (
    <header className="header">
      <div className="header-main">
        <h1 className="app-title">
          <FaTasks className="title-icon" />
          Todo App
        </h1>
        <p className="app-subtitle">
          Stay organized and get things done
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <FaTasks />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active">
            <FaClock />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.active}</div>
            <div className="stat-label">Active</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
