FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "./src/dataBase/server.js"]