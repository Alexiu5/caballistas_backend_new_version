"use strict";;
class UsuarioSistema { 
    constructor(user) {
        this.id_usuario = user.id_usuario
        this.tipo_usuario = user.tipo_usuario
        this.cliente  = user.cliente
        this.correo  = user.correo
        this.contrasena  = user.contrasena
        this.tipo_estado = user.tipo_estado
    }
};

UsuarioSistema.prototype.toArray = function() {
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