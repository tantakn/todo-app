# Todo App

初回コミットのものは以下のプロンプトのみで Claude Sonnet 4 に書いてもらったコード。
```
googleのTodoアプリのようなwebアプリケーションを作ってください。dockerを使い、フロントエンドはReact、バックエンドはpython、データベースはMySQLでそれぞれコンテナのサービスを立てて運用します。一般的な書き方でかつ、後で機能の追加がしやすいように書いてください。
```

A modern, full-stack Todo application built with React, Python (FastAPI), and MySQL, all containerized with Docker.

## Features

- ✅ Create, read, update, and delete todos
- 🎯 Priority levels (High, Medium, Low)
- 📅 Due dates with smart formatting
- 🔍 Filter todos by status and priority
- 📱 Responsive design
- 🐳 Fully containerized with Docker
- 🚀 Easy development setup

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Axios** - HTTP client for API communication
- **React Icons** - Beautiful icons
- **React DatePicker** - Date selection component
- **Styled Components** - Component-level styling

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **Pydantic** - Data validation and serialization
- **PyMySQL** - MySQL database connector

### Database
- **MySQL 8.0** - Reliable relational database

### DevOps
- **Docker & Docker Compose** - Containerization
- **Multi-stage builds** - Optimized container images

## Project Structure

```
todo-app/
├── docker-compose.yml          # Docker services configuration
├── frontend/                   # React application
│   ├── Dockerfile
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── components/         # React components
│       ├── services/          # API services
│       └── styles/           # CSS files
├── backend/                   # FastAPI application
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── main.py               # FastAPI application
│   ├── models.py             # Database models
│   ├── schemas.py            # Pydantic schemas
│   └── database.py           # Database configuration
└── database/
    └── init.sql              # Database initialization
```

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git

### 1. Clone and Start

```bash
# Clone the repository
git clone <repository-url>
cd todo-app

# Start all services
docker-compose up --build
```

### 2. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### 3. Development Mode

For development with hot reloading:

```bash
# Start in development mode
docker-compose up --build

# View logs for specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f database
```

## API Endpoints

### Todos
- `GET /api/todos` - Get all todos (with optional filters)
- `GET /api/todos/{id}` - Get specific todo
- `POST /api/todos` - Create new todo
- `PUT /api/todos/{id}` - Update todo
- `DELETE /api/todos/{id}` - Delete todo
- `PATCH /api/todos/{id}/toggle` - Toggle completion status

### Health Check
- `GET /health` - Service health check
- `GET /` - API root

## Development

### Backend Development

```bash
# Enter backend container
docker-compose exec backend bash

# Install new Python packages
pip install package-name
# Update requirements.txt

# Run tests (when implemented)
pytest

# Database migrations (when implemented)
alembic upgrade head
```

### Frontend Development

```bash
# Enter frontend container
docker-compose exec frontend bash

# Install new npm packages
npm install package-name

# Run tests
npm test

# Build for production
npm run build
```

### Database Operations

```bash
# Connect to MySQL
docker-compose exec database mysql -u todouser -p todoapp

# View logs
docker-compose logs database

# Backup database
docker-compose exec database mysqldump -u todouser -p todoapp > backup.sql
```

## Environment Variables

### Backend (.env file)
```
DATABASE_URL=mysql+pymysql://todouser:todopass@database:3306/todoapp
SECRET_KEY=your-secret-key-here
```

### Frontend (.env file)
```
REACT_APP_API_URL=http://localhost:8000
```

## Production Deployment

For production deployment:

1. **Update environment variables**
2. **Use production Docker images**
3. **Set up reverse proxy (nginx)**
4. **Configure SSL certificates**
5. **Set up monitoring and logging**

### Production Docker Compose

```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  # ... existing services with production configurations
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl
```

## Future Enhancements

### Planned Features
- [ ] User authentication and authorization
- [ ] Todo categories and tags
- [ ] File attachments
- [ ] Collaborative todos (sharing)
- [ ] Advanced filtering and search
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Bulk operations
- [ ] Todo templates
- [ ] Time tracking

### Technical Improvements
- [ ] Unit and integration tests
- [ ] CI/CD pipeline
- [ ] Database migrations with Alembic
- [ ] Caching with Redis
- [ ] Real-time updates with WebSocket
- [ ] Performance monitoring
- [ ] Security enhancements
- [ ] API rate limiting
- [ ] Backup strategies

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Stop all Docker containers
docker-compose down

# Check for processes using ports
lsof -i :3000
lsof -i :8000
lsof -i :3306
```

**Database connection issues:**
```bash
# Check database service health
docker-compose ps
docker-compose logs database

# Reset database
docker-compose down -v
docker-compose up --build
```

**Frontend not updating:**
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache frontend
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with tests
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions and support, please open an issue on GitHub.
