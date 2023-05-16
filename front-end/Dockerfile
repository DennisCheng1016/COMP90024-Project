FROM node:16
WORKDIR /front-end

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 80
CMD yarn start
