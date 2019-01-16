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

## Security

### User creation

The snippet bellow illustrates how an user can be created.

```
POST http://localhost:8080/users HTTP/1.1
Content-Type: application/json

# Request
{
    "username": "rsorage",
    "email": "rsorage@example.com",
    "password": "passwd"
}

# Response
HTTP/1.1 201 Created
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzNlNzU1MTY0MzNlNTAzMzI4ZjUyMTUiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQ3NTk3MTM3fQ.6FyzheYGxUZYvaHltSS0lbV7EuafA5B8jH-0AMkWx3g
Content-Type: application/json; charset=utf-8
Content-Length: 64

{
  "_id": "5c3e75516433e503328f5215",
  "email": "rsorage@example.com"
}
```

### Authentication

The snippet bellow illustrates how an user can be authenticated.

```
POST http://localhost:8080/users/authenticate HTTP/1.1
Content-Type: application/json

# Request
{
    "username": "rsorage",
    "password": "passwd"
}

# Response
HTTP/1.1 200 OK
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzNlNmI5ZmYxMWVmYjAyMTRiMmQ0OWEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQ3NTk2NzMzfQ.rJbj3pzADDrQxhx1MAOKQnHSlJkhLKh_aZdM704b3QM
Content-Type: application/json; charset=utf-8
Content-Length: 64

{
  "_id": "5c3e6b9ff11efb0214b2d49a",
  "email": "rsorage@example.com"
}
```

### Secure routes

To secure a route, the authentication middleware should be used.

```js
app.post('/examples', authenticate, async (req, res) => {
    const example = new Example(req.body);
    res.send(await example.save());
});
```
In this case, if a request with an invalid token won't go through.

```
POST http://localhost:8080/examples HTTP/1.1
Content-Type: application/json

# Request
{
    "name": "Example 1",
    "description": "This is the first example." 
}

# Response
HTTP/1.1 401 Unauthorized
```

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