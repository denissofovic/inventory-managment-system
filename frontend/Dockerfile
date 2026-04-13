FROM node:18.19.1

WORKDIR /app

COPY package*.json ./

RUN npm install

ENV BACKEND_URL=http://backend:8080/api/inventoryitem

EXPOSE 3000

CMD ["sh", "-c", "npm install && npm start"]