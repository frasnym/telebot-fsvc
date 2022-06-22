FROM node:16-alpine3.15
RUN mkdir -p /usr/src/node-app

WORKDIR /usr/src/node-app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000