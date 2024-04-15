## Fichier : ./react-docker/Dockerfile
FROM node:21.7.3-alpine3.18

WORKDIR /twenty4-seven

COPY package*.json ./

RUN yarn install

EXPOSE 3000

CMD ["npm", "start"]