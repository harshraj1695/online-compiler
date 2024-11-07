

# Start with the latest Ubuntu image
FROM ubuntu:latest

# Install necessary build tools and Node.js
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    curl \
    gnupg2 \
    lsb-release \
    apt-transport-https \
    ca-certificates \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /sandbox

# Copy the application files into the container (if you have a package.json file)
COPY . .

# Install Node.js dependencies (assuming you have a package.json)
RUN npm install

# Expose the port your app is running on (modify as necessary)
EXPOSE 3000

# Start the Node.js application (modify the entry point as needed)
CMD ["node", "index.js"]







