"use strict";;
class UsuarioSistema { 
    constructor(usuario) {
        this.id_usuario = usuario.id_usuario
        this.tipo_usuario = usuario.tipo_usuario
        this.cliente  = usuario.cliente
        this.correo  = usuario.correo
        this.contrasena  = usuario.contrasena
        this.tipo_estado = usuario.tipo_estado
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