FROM node:18.19.1

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 5050

CMD ["sh", "-c", "npm install && npm start"]