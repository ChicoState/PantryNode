FROM node:alpine as node
WORKDIR /app/frontend
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
CMD ["npm", "start"]