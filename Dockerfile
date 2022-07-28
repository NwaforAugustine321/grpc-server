FROM node:alpine

WORKDIR /grpc-server

COPY ["package*.json" ,"."]

COPY [".","."]
RUN npm i

CMD ["node","./src/server.js"]