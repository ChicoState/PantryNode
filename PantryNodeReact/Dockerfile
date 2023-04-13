#### Stage 1: Build the web frontend
FROM node:alpine as web
WORKDIR /app
COPY ./PantryNodeReact/package.json ./
RUN npm install

COPY ./PantryNodeReact/ ./

#### Stage 2: Build the REST api server
FROM node:alpine as server
WORKDIR /app
COPY ./backend/package.json ./
RUN npm install

COPY ./backend/ ./
