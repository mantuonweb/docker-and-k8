# Docker Swarm Application

This project demonstrates a multi-service application deployed using Docker Swarm. It includes a MongoDB database, a backend service, and a frontend service.

## Project Structure

- **mongodb**: MongoDB database service.
- **backend**: Node.js backend service.
- **frontend**: Frontend service (e.g., React, Angular, or static HTML).

## Prerequisites

- Docker installed on your system.
- Docker Swarm initialized (`docker swarm init`).

## Services

### 1. MongoDB
- **Image**: `mongo:6.0`
- **Ports**: `27017:27017`
- **Environment Variables**:
  - `MONGO_INITDB_ROOT_USERNAME`: `root`
  - `MONGO_INITDB_ROOT_PASSWORD`: `example`
- **Volume**: `mongodb_data` (to persist database data).

### 2. Backend
- **Build Context**: `./backend`
- **Image**: `backend:latest`
- **Ports**: `3000:3000`
- **Environment Variables**:
  - `MONGO_URI`: `mongodb://root:example@mongodb:27017/test`

### 3. Frontend
- **Build Context**: `./frontend`
- **Image**: `frontend:latest`
- **Ports**: `3300:80`
- **Volume**: `./frontend/public:/usr/share/nginx/html:ro`

## Network

All services are connected via an `overlay` network named `application-network`.

## Deployment Steps

1. **Initialize Docker Swarm**:
   ```bash
   docker swarm init
   ```

2. **Build Images**:
   ```bash
   docker build -t backend:latest ./backend
   docker build -t frontend:latest ./frontend
   ```

3. **Deploy the Stack**:
   ```bash
   docker stack deploy -c docker-compose-swarm.yml application
   ```

4. **Verify Services**:
   Check the status of the services:
   ```bash
   docker stack services application
   ```

5. **Access the Application**:
   - **MongoDB**: `localhost:27017`
   - **Backend**: `http://localhost:3000`
   - **Frontend**: `http://localhost:3300`

## Stopping the Stack

To stop and remove the stack:
```bash
docker stack rm application
```

## Service Logs

To view logs for individual services:
```bash
docker service logs application_backend
docker service logs application_frontend
docker service logs application_mongodb
```

## Rebuild and Redeploy

If you need to rebuild and redeploy the stack:
```bash
docker stack rm application
docker stack deploy -c docker-compose-swarm.yml application
```