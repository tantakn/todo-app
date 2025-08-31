-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    due_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create categories table for future extension
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    color VARCHAR(7) DEFAULT '#000000',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table for future extension
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO todos (title, description, completed, priority, due_date) VALUES
('Learn Docker', 'Complete Docker tutorial and practice', FALSE, 'high', '2024-01-15 10:00:00'),
('Build Todo App', 'Create a full-stack todo application', FALSE, 'high', '2024-01-20 18:00:00'),
('Code Review', 'Review teammate code and provide feedback', FALSE, 'medium', '2024-01-12 15:00:00'),
('Completed Task', 'This is an example of completed task', TRUE, 'low', '2024-01-10 12:00:00');

INSERT INTO categories (name, color) VALUES
('Work', '#FF6B6B'),
('Personal', '#4ECDC4'),
('Study', '#45B7D1'),
('Shopping', '#96CEB4');
