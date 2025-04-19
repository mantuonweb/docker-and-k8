# Stage 1: Build Angular application
# Download Node Alpine image
FROM node:alpine AS build

# Setup the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy other files and folders to the working directory
COPY . .

# Build Angular application in PROD mode
RUN npm run build --prod

# Stage 2: Serve with NGINX
# Download NGINX Image
FROM nginx:alpine

# Copy built Angular app files to NGINX HTML folder
COPY --from=build /usr/src/app/dist/demo/browser /usr/share/nginx/html

# Expose port 8000
EXPOSE 8000

# Override the default NGINX configuration to listen on port 8000
RUN sed -i 's/listen\s*80;/listen 8000;/' /etc/nginx/conf.d/default.conf

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]