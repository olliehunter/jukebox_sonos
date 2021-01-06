FROM node:14

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install

WORKDIR /usr/src/app/client

RUN npm install
RUN npm run build

WORKDIR /usr/src/app

EXPOSE 3002
EXPOSE 3001
EXPOSE 5005

CMD ["node", "server.js"]