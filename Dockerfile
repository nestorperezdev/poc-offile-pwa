FROM node:20-alpine as BUILD_IMAGE
USER root
WORKDIR /home/node/app
COPY --chown=node:node . .
RUN npm install
RUN npm run build

FROM node:20-alpine
USER root
WORKDIR /home/node/app
COPY --from=BUILD_IMAGE /home/node/app/dist ./dist
RUN npm install -g serve@14.2.4
EXPOSE 80
ENV PORT=80
CMD [ "serve", "-s", "dist", "-p", "80" ]
