module.exports = app => {
    app.use((req, res, next) => {
        // This middleware throws an error, so Express will go straight to
        // the next error handler
        setImmediate(() => { next(new Error('Woops! route not found...')); });
    });

    app.use((error, req, res, next) => {
        // Any request to this server will get here, and will send an HTTP
        // response with the error message 'woops'
        // res.status(error.status || 500);
        return res.status(500).send({
            status: false,
            error: {
                message: error.message,
                detail: error
            }
        })
    });
};



