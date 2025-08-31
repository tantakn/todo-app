#!/bin/bash

# Todo App Development Setup Script
# This script helps you get started with the Todo App development environment

set -e

echo "🚀 Todo App Development Setup"
echo "================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    echo "❌ Docker daemon is not running. Please start Docker first."
    exit 1
fi

echo "✅ Docker daemon is running"

# Function to check if port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null; then
        echo "⚠️  Port $port is already in use"
        echo "Please stop the service using port $port or change the port in docker-compose.yml"
        return 1
    fi
    return 0
}

# Check required ports
echo "🔍 Checking required ports..."
check_port 3000 || exit 1
check_port 8000 || exit 1
check_port 3306 || exit 1

echo "✅ All required ports are available"

# Create environment files if they don't exist
echo "📄 Setting up environment files..."

if [ ! -f .env ]; then
    cat > .env << EOL
# Database Configuration
MYSQL_DATABASE=todoapp
MYSQL_USER=todouser
MYSQL_PASSWORD=todopass
MYSQL_ROOT_PASSWORD=rootpass

# Backend Configuration
DATABASE_URL=mysql+pymysql://todouser:todopass@database:3306/todoapp
SECRET_KEY=your-secret-key-change-this-in-production

# Frontend Configuration
REACT_APP_API_URL=http://localhost:8000
EOL
    echo "✅ Created .env file"
else
    echo "✅ .env file already exists"
fi

# Build and start services
echo "🏗️  Building and starting services..."
echo "This may take a few minutes on first run..."

docker-compose down -v 2>/dev/null || true
docker-compose build --no-cache
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."

# Wait for database
echo "Waiting for database..."
timeout 60 bash -c 'until docker-compose exec -T database mysqladmin ping -h localhost --silent; do sleep 2; done'

# Wait for backend
echo "Waiting for backend..."
timeout 60 bash -c 'until curl -f http://localhost:8000/health > /dev/null 2>&1; do sleep 2; done'

# Wait for frontend
echo "Waiting for frontend..."
timeout 60 bash -c 'until curl -f http://localhost:3000 > /dev/null 2>&1; do sleep 2; done'

echo ""
echo "🎉 Todo App is now running!"
echo "================================"
echo "📱 Frontend:     http://localhost:3000"
echo "🔧 Backend API:  http://localhost:8000"
echo "📚 API Docs:     http://localhost:8000/docs"
echo "🗄️  Database:    localhost:3306 (todoapp/todouser/todopass)"
echo ""
echo "📋 Useful commands:"
echo "  docker-compose logs -f          # View all logs"
echo "  docker-compose logs -f frontend # View frontend logs"
echo "  docker-compose logs -f backend  # View backend logs"
echo "  docker-compose down             # Stop all services"
echo "  docker-compose up -d            # Start services in background"
echo ""
echo "🐛 Troubleshooting:"
echo "  If you encounter issues, try:"
echo "  docker-compose down -v"
echo "  docker system prune -a"
echo "  ./setup.sh"
echo ""
echo "Happy coding! 🚀"
