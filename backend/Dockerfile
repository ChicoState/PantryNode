FROM node:alpine as node
WORKDIR /app/backend
COPY package*.json ./
RUN npm install

CMD ["npm", "start"]
