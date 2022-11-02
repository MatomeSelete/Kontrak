# FROM node:14.11.0-alpine3.11

# RUN apk update
# RUN apk add git

# WORKDIR /usr/src/app

# COPY . .

# RUN npm i -g @angular/cli@10.0.6

# RUN npm i
# RUN ng --version
# RUN npm run build

# RUN rm -rf /usr/src/app/src
# RUN rm -rf /usr/src/app/node_modules

# RUN npm install express

# EXPOSE $PORT

# CMD [ "npm", "run" , "start:prod" ]
#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/frontend /usr/share/nginx/html