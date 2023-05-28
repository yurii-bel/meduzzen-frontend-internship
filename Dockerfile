FROM node:latest

RUN mkdir -p /app
WORKDIR /app
ADD . /app/

RUN rm yarn.lock || true
RUN npm install
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "npm", "run", "start"]
