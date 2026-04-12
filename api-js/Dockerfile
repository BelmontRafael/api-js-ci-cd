FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN apk upgrade --no-cache && npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]