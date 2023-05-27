FROM node:latest

# WORKDIR ./

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install

COPY . .

# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install
# COPY . .do

EXPOSE 3000

CMD ["npm", "start"]
# CMD ["npm", "start", "--prefix", "/app/"]
