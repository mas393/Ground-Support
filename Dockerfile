#while in Ground-Support folder
#build command:
#> docker build -t ground-support .
#run command:
#> docker run -d -p 127.0.0.1:3000:3000 -p 127.0.0.1:9090:9090 ground-support

FROM node:18-alpine

# Install dependencies.
RUN npm install -g typescript
RUN npm install -g mongodb
#RUN apk update

WORKDIR /app/client/
COPY ./client/package.json .
RUN yarn install

WORKDIR /app/services/server
COPY ./services/server/package.json .
RUN yarn install

WORKDIR /app
COPY . .

EXPOSE 3000
EXPOSE 9090
CMD ["npm", "start"]

