FROM node:20.2 as build

WORKDIR /architecton

COPY package*.json .

RUN npm ci

COPY . .

CMD ["npm run build"]