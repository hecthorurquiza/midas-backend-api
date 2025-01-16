FROM node:20-alpine3.20 AS build

WORKDIR /usr/app

COPY package.json yarn.lock .env ./

COPY . .

RUN yarn 

FROM node:20-alpine3.20

WORKDIR /usr/app

COPY --from=build /usr/app/package.json ./package.json
COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/src ./src
COPY --from=build /usr/app/tsconfig.json ./tsconfig.json
COPY --from=build /usr/app/prisma ./prisma
COPY --from=build /usr/app/.env ./.env

EXPOSE 8080

RUN npx prisma generate

CMD [ "yarn", "dev" ]