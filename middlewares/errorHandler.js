const ServiceError = require('../errors/ServiceError');

module.exports = (err, req, res, next) => {
    if(err instanceof ServiceError) {
        console.log('#*#*#*#');
        res.status(err.status);
        res.send(err.message || 'Internal server error.');
    }
};
