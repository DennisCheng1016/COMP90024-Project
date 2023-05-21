FROM node:16
WORKDIR /front-end

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 8060
CMD yarn start
