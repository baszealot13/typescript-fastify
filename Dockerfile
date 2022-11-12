FROM node:14
WORKDIR /api

COPY package.json package-lock.json* api/

RUN npm install

COPY . /api

RUN npm run build
RUN date > build_time.txt

CMD PORT=3030 NODE_END=development node dist/index.js

EXPOSE 3030

