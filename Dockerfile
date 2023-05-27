FROM node:latest

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm install --prefix /app/

COPY . /app

# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install
# COPY . .do

EXPOSE 3000

CMD ["npm", "start", "--prefix", "/app/"]
