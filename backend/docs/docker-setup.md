# Docker Setup for Postmorf Backend (Method 2: Both Services in Docker)

This document describes how to run both the PostgreSQL database and the Postmorf backend API in Docker containers using a shared network.

## Prerequisites
- Docker installed and running
- Docker Compose (optional, but recommended for simplicity)

## Option 1: Using Docker Compose (Recommended)

Create a `docker-compose.yml` file in the project root:

```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    container_name: postmorf-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres123
      POSTGRES_DB: postmorf
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - postmorf-net

  backend:
    build: .
    container_name: postmorf-backend
    environment:
      POSTGRES_SERVER: db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres123
      POSTGRES_DB: postmorf
      POSTGRES_PORT: 5432
      SECRET_KEY: your-secret-key-here-change-in-production-in-dev-use-strong-key
      ACCESS_TOKEN_EXPIRE_MINUTES: 30
      API_V1_STR: /api/v1
      PROJECT_NAME: Postmorf API
    ports:
      - "8800:8800"
    depends_on:
      - db
    networks:
      - postmorf-net

networks:
  postmorf-net:
    driver: bridge

volumes:
  postgres_data:
```

Then run:
```bash
docker-compose up -d
```

## Option 2: Manual Docker Commands

### 1. Create a Docker network for inter-container communication:
```bash
docker network create postmorf-net
```

### 2. Start the PostgreSQL container:
```bash
docker run --name postmorf-db \
  --network postmorf-net \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres123 \
  -e POSTGRES_DB=postmorf \
  -p 5432:5432 \
  -d postgres:15
```

### 3. Build and run the backend container:
```bash
# Build the backend image (from the backend directory)
docker build -t postmorf-backend .

# Run the backend container
docker run --name postmorf-backend \
  --network postmorf-net \
  -e POSTGRES_SERVER=postmorf-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres123 \
  -e POSTGRES_DB=postmorf \
  -e POSTGRES_PORT=5432 \
  -e SECRET_KEY=your-secret-key-here-change-in-production-in-dev-use-strong-key \
  -e ACCESS_TOKEN_EXPIRE_MINUTES=30 \
  -e API_V1_STR=/api/v1 \
  -e PROJECT_NAME=Postmorf API \
  -p 8800:8800 \
  -d postmorf-backend
```

## Verification

1. Check if containers are running:
```bash
docker ps
```
You should see both `postmorf-db` and `postmorf-backend` containers.

2. Test the API health endpoint:
```bash
curl http://localhost:8800/health
```
Expected response: `{"status":"ok"}`

3. Test the config endpoint (to verify environment variables):
```bash
curl http://localhost:8800/api/v1/posts/config-test
```
Expected response (values may vary):
```json
{
  "project_name": "Postmorf API",
  "api_v1_str": "/api/v1",
  "db_server": "postmorf-db",
  "db_user": "postgres",
  "db_name": "postmorf",
  "secret_key_configured": true
}
```

## Stopping and Cleaning Up

To stop the containers:
```bash
docker stop postmorf-backend postmorf-db
```

To remove the containers and network:
```bash
docker rm postmorf-backend postmorf-db
docker network rm postmorf-net
```

If using Docker Compose:
```bash
docker-compose down
```

## Notes

- The backend connects to the database using the container name `postmorf-db` (or `db` when using docker-compose) as the host.
- The PostgreSQL data is persisted in a Docker volume named `postgres_data` (when using compose) or you can add a volume mount in the manual command.
- Adjust environment variables as needed for your deployment.