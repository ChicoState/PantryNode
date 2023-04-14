FROM node:alpine as node
WORKDIR /app/backend
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

CMD ["npm", "start"]
