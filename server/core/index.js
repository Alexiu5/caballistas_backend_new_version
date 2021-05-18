const AppError = require('../utils/appError');

const statusCode = {
    ok: 200,
    created: 201,
    accepted: 202,
    noContent: 204,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    serverError: 500,
    badGateway: 502,
};

const handleOk = (res, message) => {
    return res.status(statusCode.ok).json(message);
};
const handleCreated = (res, message) => {
    return res.status(statusCode.created).send(message);
};
const handleNoContent = (res, message) => {
    const error = new AppError(message, statusCode.noContent);
    return res.status(statusCode.noContent).send(error);
};
const handleBadRequest = (res, message) => {
    const error = new AppError(message, statusCode.badRequest);
    return res.status(statusCode.badRequest).send(error);
};
const handleUnauthorized = (res, message) => {
    const error = new AppError(message, statusCode.unauthorized);
    return res.status(statusCode.unauthorized).send(error);
};
const handleForbidden = (res, message) => {
    const error = new AppError(message, statusCode.forbidden);
    return res.status(statusCode.forbidden).send(error);
};
const handleNotFound = (res, message) => {
    const error = new AppError(message, statusCode.notFound);
    return res.status(statusCode.notFound).json(error);
};
const handleServerError = (res, message) => {
    const error = new AppError(message, statusCode.serverError);
    return res.status(statusCode.serverError).send(error);
};
const handleBadGateway = (res, message) => {
    const error = new AppError(message, statusCode.badGateway);
    return res.status(statusCode.badGateway).send(error);
};

module.exports = {
    handleOk,
    handleCreated,
    handleNoContent,
    handleBadRequest,
    handleUnauthorized,
    handleForbidden,
    handleNotFound,
    handleServerError,
    handleBadGateway,
    statusCode,
};
