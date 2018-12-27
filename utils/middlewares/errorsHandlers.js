const Sentry = require("@sentry/node");
const boom = require("boom");
const { config } = require('../../config');
const isRequestAjaxOrApi = require('../../utils/isRequestAjaxOrApi');

Sentry.init({ dsn: `https://${config.sentryDns}@sentry.io/${config.sentryId}` });

function withErrorStack(err, stack) {
    if(config.dev) {
       return { ...err, stack } // Object.assign({}, err, stack)
    }
}

function logErrors(err, req, res, next) {
    Sentry.captureException(err);
    console.error(err.stack);
    next(err);
}

function wrapErrors(err, req, res, next) {
    if(!err.isBoom) {
        next(boom.badImplementation(err));
    }
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    const {
        output: { statusCode, payload }
    } = err;

    // catch errors for AJAX request or if an error ocurrors while streaming
    if(isRequestAjaxOrApi(req) || res.headersSent) {
        res.status(statusCode).json(withErrorStack(payload, err.stack))
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    // catch errors while streaming
    const {
        output: { statusCode, payload }
    } = err;
    res.status(statusCode);
}

module.exports = {
    logErrors,
    wrapErrors,
    clientErrorHandler,
    errorHandler,
};