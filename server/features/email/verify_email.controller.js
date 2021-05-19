const { sendEmail } = require('./verify_email.service');
const { handleServerError, handleOk } = require('../../core');
/**
 * Metodo que permite enviar un mail para la validacion del correo electronico
 * del user.
 *
 * Acepta como parametros opcionales el from, subject y text
 *
 * @param {Request} request
 * @param {Response} response
 */
function verificarEmail(request, response) {
    const emailParams = {
        to: request.body.email,
        text: `<a href="https://caballistasfrontend.herokuapp.com/pass">Confirmar correo</a>`,
    };

    sendEmail(emailParams)
        .then((res) => {
            handleOk(response, res);
        })
        .catch((err) => {
            response.status(500).send('Something broke!', err);
        });
}

/**
 *  Controlador encargado de enviar un email de verificacion de contraseña
 * @param {*} request
 * @param {*} response
 */
function envioPassword(request, response) {
    const emailParams = {
        to: request.body.email,
        text: `<a href="https://caballistasfrontend.herokuapp.com/pass"> Ingresa al siguiente link para restablecer una nueva contraseña</a>`,
    };

    sendEmail(emailParams)
        .then((res) => {
            handleOk(response, res);
        })
        .catch((err) => {
            handleServerError(response, err.message);
        });
}

module.exports = {
    verificarEmail,
    envioPassword,
};
