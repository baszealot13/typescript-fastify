FROM node:14
WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN date > build_time.txt

CMD node dist/index.js

EXPOSE 3030

