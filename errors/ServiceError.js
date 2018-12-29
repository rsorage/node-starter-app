module.exports = class ServiceError extends Error {
    constructor(message, status) {
        super(message || 'Internal server error');

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.status = status || 500;
    }
};