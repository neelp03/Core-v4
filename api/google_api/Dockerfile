FROM node:8.10.0-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --production

COPY ./google_api /app/google_api

COPY ./util /app/util

COPY ./config/config.js /app/config/config.js

EXPOSE 8082

ENV DOCKER true

ENV NODE_ENV production

CMD [ "node", "./google_api/server.js" ]
