FROM node:alpine as node
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
CMD ["npm", "start"]