const mongoose = require('mongoose');
const User = mongoose.model('User');

const ServiceError = require('../errors/ServiceError');

const authenticate = async (req, res, next) => {
    const token = req.header('x-auth');
    
    try {
        const user = await User.findByToken(token);
        
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