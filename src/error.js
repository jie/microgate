class ExtendableError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

export class GatewayLogicError extends ExtendableError {
    constructor(statusCode, statusMessage) {
        super(`statusCode: ${statusCode}, statusMessage: ${statusMessage}`);
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.errName = 'GatewayLogicError'
    }
}


module.exports = {
    GatewayLogicError: GatewayLogicError
}
