FROM node:18

# Working directory
WORKDIR /usr/src/app

# Copy project files
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy the remaining files
COPY . .

# Expose port
EXPOSE 4200

# Start up command
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
