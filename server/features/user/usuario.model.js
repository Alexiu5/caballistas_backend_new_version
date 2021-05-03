'use strict';
class UsuarioSistema {
    constructor({id_usuario, tipo_usuario, cliente, correo, contrasena, tipo_estado}) {
        this.id_usuario = id_usuario;
        this.tipo_usuario = tipo_usuario;
        this.cliente = cliente ? cliente : '';
        this.correo = correo ? correo : '';
        this.contrasena = contrasena ? contrasena : '';
        this.tipo_estado = tipo_estado;
    }

    isValidUser() {
        return this.cliente && this.correo;
    }
}

UsuarioSistema.prototype.toArray = function () {
    return [
        this.id_usuario,
        this.tipo_usuario,
        this.cliente,
        this.correo,
        this.contrasena,
        this.tipo_estado,
    ];
};

module.exports = UsuarioSistema;
