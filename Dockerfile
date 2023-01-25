FROM node:lts-alpine as base

ENV NODE_ENV=production
WORKDIR /usr/src/app

FROM base as dependencies

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production

FROM dependencies as build

COPY . .
RUN yarn build

EXPOSE 5432
CMD ["npm", "start"]
