FROM node:latest

RUN mkdir -p /app
WORKDIR /app
ADD . /app/

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm install --prefix /app/


COPY . /app

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["npm", "start"]
# CMD ["npm", "start", "--prefix", "/app/"]
# CMD ["npm", "run", "build"]
