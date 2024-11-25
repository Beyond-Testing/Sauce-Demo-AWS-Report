# Use the official Node.js image as a base, and include Playwright dependencies
FROM mcr.microsoft.com/playwright:v1.49.0-jammy

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project's files into the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Install Playwright browsers (this is done automatically in the base image, but to ensure correctness)
RUN npx playwright install

# Set environment variable for CI (important for CI/CD environments)
ENV CI=true

# Command to run tests
CMD ["npm", "run", "test"]