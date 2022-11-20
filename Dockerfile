FROM node:16

WORKDIR /usr/src

COPY . .

RUN npm i
RUN npm run prisma:generate
RUN npm run build
COPY . .

CMD [ "npm", "start" ]
