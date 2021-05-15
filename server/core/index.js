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
    return res.status(statusCode.ok).send(message);
};
const handleCreated = (res, message) => {
    return res.status(statusCode.created).send(message);
};
const handleNoContent = (res, message) => {
    return res.status(statusCode.noContent).send(message);
};
const handleBadRequest = (res, message) => {
    return res.status(statusCode.badRequest).send(message);
};
const handleUnauthorized = (res, message) => {
    return res.status(statusCode.unauthorized).send(message);
};
const handleForbidden = (res, message) => {
    return res.status(statusCode.forbidden).send(message);
};
const handleNotFound = (res, message) => {
    return res.status(statusCode.notFound).json(message);
};
const handleServerError = (res, message) => {
    return res.status(statusCode.serverError).send(message);
};
const handleBadGateway = (res, message) => {
    return res.status(statusCode.badGateway).send(message);
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
