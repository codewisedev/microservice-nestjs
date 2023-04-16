FROM node:18.9.0-alpine3.16
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
CMD npm run start:dev