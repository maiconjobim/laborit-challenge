FROM node:18-alpine3.19 as build
WORKDIR /build

COPY src ./src
COPY package.json .
COPY package-lock.json .
COPY nest-cli.json .
COPY *.json ./
COPY *.js ./
COPY .env ./

RUN npm install 
RUN npm run build

FROM node:18-alpine3.19 as runtime
WORKDIR /app
COPY --from=build /build/dist /app/dist
COPY --from=build /build/.env .env

COPY --from=build /build/node_modules /app/dist/node_modules

CMD ["node", "/app/dist/main"]
