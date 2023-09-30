FROM node:18-alpine

# Install dependencies.
RUN npm install -g typescript
COPY . /app
RUN npm install /app &&\
    npm install /app/client &&\
    npm install /app/services/server
RUN apt-get update && \
    apt-get install python &&

WORKDIR /app

# TODO: Figure out mongodb dependencies.

# Run the actual server on startup.
#CMD ["npm", "run", "both"]
#EXPOSE 3000
