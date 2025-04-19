#!/bin/bash

# Initialize Docker Swarm
docker swarm init || echo "Swarm already initialized"

# Build the backend and frontend images
docker build -t backend:latest ./backend
docker build -t frontend:latest ./frontend

# Deploy the stack
docker stack deploy -c docker-compose-swarm.yml application

# Display the status of the services
docker stack services application