FROM keymetrics/pm2:10-alpine

EXPOSE 8080

WORKDIR /usr/src/app

ENTRYPOINT [ "pm2-dev", "index.js" ]