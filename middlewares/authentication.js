const mongoose = require('mongoose');
const User = mongoose.model('User');

const ServiceError = require('../errors/ServiceError');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization');
    
    try {
        const user = await User.findByToken(token.replace('Bearer ', ''));

        if(!user)
            return Promise.reject();
        
        req.user = user;
        req.token = token;
        next();
    }
    catch(e) {
        next(new ServiceError('Não autenticado!', 401));
    }
};

module.exports = { authenticate }