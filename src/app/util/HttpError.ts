class HttpError extends Error {
    public name:any;
    constructor(public message, public status:any) {
        super(message);
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
        this.stack = new Error().stack;
    }
}

export default HttpError;
