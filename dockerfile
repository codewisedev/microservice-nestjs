FROM node:18.9.0-alpine3.16
RUN apk update && apk upgrade && apk add curl py-pip make g++
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
CMD npm run start