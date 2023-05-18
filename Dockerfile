# Stage 1: Build the React frontend
FROM node:16 AS frontend
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci --production
COPY client ./
RUN npm run build

# Stage 2: Combine frontend and backend into a single image
FROM node:16
WORKDIR /app
COPY --from=frontend /app/client/build ./client
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
