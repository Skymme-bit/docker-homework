# 🌟 Use Node.js as base image
FROM node:alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (to leverage Docker cache)
COPY . /usr/src/app

# Install dependencies
RUN npm install -g @angular/cli

RUN npm install

# Start Angular using ng serve
CMD ["ng", "serve", "--host", "0.0.0.0"]
