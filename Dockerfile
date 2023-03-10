#Primera Etapa
FROM node:18-alpine as gui-download-race-rankings

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Segunda Etapa
FROM nginx:1.17.1-alpine

#Si estas utilizando otra aplicacion cambia PokeApp por el nombre de tu app
COPY --from=gui-download-race-rankings /app/dist/gui-download-race-rankings /usr/share/nginx/html