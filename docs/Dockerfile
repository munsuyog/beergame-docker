FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Docusaurus site
RUN npm run build

EXPOSE 3000

# Serve the built site
CMD ["npm", "run", "serve"]