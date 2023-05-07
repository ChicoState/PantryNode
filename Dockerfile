
# Define the base image
FROM node:14

# Create a working directory
WORKDIR /app

# Copy the entire monorepo into the Docker image
COPY . .

#RUN npm install -g lerna

# Install dependencies for all packages in the monorepo
#RUN lerna bootstrap

#RUN lerna exec npm install

RUN npm i

# Build all packages in the monorepo
#RUN npm start

#EXPOSE 3000
#EXPOSE 3001
#ENTRYPOINT ["/bin/sh","-c", "npm start"]
