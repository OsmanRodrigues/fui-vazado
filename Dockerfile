FROM node:14.15.4-slim

ENV HOME=/home/app

COPY package.json package-lock.json $HOME/server/

WORKDIR $HOME/server

RUN npm install --silent --no-progress

COPY . $HOME/server

ENTRYPOINT node $HOME/server/dist/src/index.js
