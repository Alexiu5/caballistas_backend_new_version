const jwt = require('jsonwebtoken');
const core = require('../core');
const UsuarioService = require('../features/user/usuario.service');
const AppError = require('../utils/appError');
// const Usuario = require('../feafdfldkjf;alsdtures/user/usuario.model');
// const catchAsync = require('../utils/catchAsync');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return core.handleBadRequest(res, 'Email or password not provided');
        }

        const usuario = await UsuarioService.login(email, password);
        const token = signToken(usuario.id_usuario);

        core.handleOk(res, {
            status: 'success',
            token,
        });
    } catch (error) {
        core.handleNotFound(res, error);
    }
};

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

/**
 * This middleware looks into the request and
 * validates if token exist and if is valid
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const protect = async (req, res, next) => {
    let token;

    // 1). Get token and check if it's there
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    // TO-DO: refactor of this validation
    if (!token) {
        return next(
            core.handleUnauthorized(
                res,
                new AppError(
                    'you not are logged in',
                    core.statusCode.unauthorized
                )
            )
        );
    }

    // 2. Verification token
    try {
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        const response = await UsuarioService.findById(decode.id);

        if (!response || !response.isUserValid()) {
            return next(
                core.handleUnauthorized(
                    res,
                    new AppError('User not found', core.statusCode.unauthorized)
                )
            );
        }
    } catch (error) {
        core.handleBadRequest(res, new AppError(error.message));
    }
    next();
};

module.exports = {
    login,
    protect,
};
