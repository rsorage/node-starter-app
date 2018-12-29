const mongoose = require('mongoose');
const User = mongoose.model('User');

const ServiceError = require('../errors/ServiceError');

const _ = require('lodash');
const { authenticate } = require('../middlewares/authentication');

module.exports = app => {

    app.get('/users/me', authenticate, async (req, res) => {
        res.send(req.user);
    });

    app.post('/users', async (req, res, next) => {
        const body = _.pick(req.body, ['email', 'password']);
        const user = new User(body);

        user.save()
            .then(() => user.generateAuthToken())
            .then(token => res.status(201).header('x-auth', token).send(user))
            .catch(e => next(new ServiceError(e.message, 409)));
    });

}