# Stage 1: Build Angular application
# Download Node Alpine image
FROM node:alpine AS build

# Setup the working directory
WORKDIR /usr/src/app

# Declare a volume for the working directory
VOLUME ["/usr/src/app"]

# Expose port 4400 for Angular development server
EXPOSE 4400

# Change directory to ngdemo and start the Angular development server
CMD ["sh", "-c", "cd ngdemo && npm install && ng serve --host 0.0.0.0 --port 4400"]

# docker build -t angular-app:latest .
# docker run -v d:/2025/docker-learn/chap2/ngdemo:/usr/src/app/ngdemo -p 4400:4400 angular-app:latest