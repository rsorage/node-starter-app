const mongoose = require('mongoose');
const User = mongoose.model('User');

const ServiceError = require('../errors/ServiceError');

const _ = require('lodash');
const bcrypt = require('bcryptjs');
const { authenticate } = require('../middlewares/authentication');

module.exports = app => {

    app.get('/users/me', authenticate, async (req, res) => {
        res.send(req.user);
    });

    app.post('/users', async (req, res, next) => {
        const body = {
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        };
        const user = new User(body);

        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).header('Authorization', `Bearer ${token}`).send(user);
    });

    app.post('/users/authenticate', async (req, res, next) => {
        const body = _.pick(req.body, ['username', 'email', 'password']);
        
        const user = await User.findOne({ username: body.username });

        if(user && bcrypt.compareSync(body.password, user.password)) {
            const token = await user.generateAuthToken();
            return res.header('Authorization', `Bearer ${token}`).send(user);
        }

        return next(new ServiceError('Username or password wrong!', 401));

        // user.save()
        //     .then(() => user.generateAuthToken())
        //     .then(token => res.status(201).header('Authorization', `Bearer ${token}`).send(user))
        //     .catch(e => next(new ServiceError(e.message, 409)));
    });

}