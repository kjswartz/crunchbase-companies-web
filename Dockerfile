# Use an official Node.js runtime as a parent image
FROM node:22.3

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
# RUN npm run build

# Serve the app using a lightweight web server (e.g., serve)
# RUN npm install -g serve
# CMD ["serve", "-s", "build"]

# Expose port 3000 (or whichever port your app runs on)
EXPOSE 3000

CMD [ "npm", "start" ]
