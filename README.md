# NodeJS Starter Application

This is a NodeJS Starter Application to help developers set up their develpment environment with minimal effort. In order to get the most of this project, it is recommended to have Docker installed.

## Docker Compose

The `docker-compose.yml` file is configured to fire up three containers:

| Docker image     |      Tag     |  Description    |
|------------------|--------------|-----------------|
| keymetrics/pm2   | 10-alpine    | Web server      |
| mongo            | latest       | Database server |
| redis            | alpine       | Cache server    |

The web server container started with a bind mount<sup id="bind-mount">[1](#f1)</sup> and PM2<sup id="pm2">[2](#f2)</sup> is configured to automatically restart<sup id="pm2-auto-restart">[3](#f3)</sup> the application on file changes.

## Start up

1. `git clone` the repository.
2. Run `docker-compose up` to fire up the development environment.
3. That's it, you have set up a fully configured dev environment.

The changes made to files are being watched and the web server reloads automatically on file changes. This feature was only tested on **linux machines**.

## Roadmap

* Authentication via JWT (branch **develop**)
* CI/CD: Travis or Gitlab (tbd)
* Testing with Jest
* Preparation for production deploy
* SocketIO + Redis PUB/SUB

___
<b id="f1">1</b> See [Use bind mounts](https://docs.docker.com/storage/bind-mounts/). [↩](#bind-mount)

<b id="f2">2</b> See [PM2 Home Page](http://pm2.keymetrics.io/). [↩](#pm2)

<b id="f3">3</b> See [Watch & Restart](http://pm2.keymetrics.io/docs/usage/watch-and-restart/). [↩](#pm2-auto-restart)