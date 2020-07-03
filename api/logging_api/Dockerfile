FROM node:8.10.0-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --production

COPY ./logging_api /app/logging_api

COPY ./util /app/util

COPY ./config/config.js /app/config/config.js

EXPOSE 8081

ENV DOCKER true

ENV NODE_ENV production

CMD [ "node", "./logging_api/server.js" ]
