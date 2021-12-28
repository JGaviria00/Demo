FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install pm2@latest -g
COPY . .
CMD ["pm2-runtime", "./src/index.js"]
# CMD ["npm", "test"]