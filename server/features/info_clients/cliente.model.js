"use strict";
class Cliente { 
    constructor(cliente) {
        this.id_cliente = cliente?.id_cliente;
        this.nombres  = cliente?.nombres
        this.apellidos  = cliente?.apellidos
        this.tipo_documento = cliente?.tipo_documento
        this.numero_documento  = cliente?.numero_documento
        this.telefono = cliente?.telefono
        this.direccion  = cliente?.direccion
        this.id_departamento  = cliente?.id_departamento
        this.id_municipio = cliente?.id_municipio
    }
};

Cliente.prototype.toArray = function() {
    return [
        this.id_cliente,
        this.nombres,
        this.apellidos,
        this.tipo_documento,
        this.numero_documento,
        this.telefono,
        this.direccion,
        this.id_departamento,
        this.id_municipio
    ];
};

module.exports = Cliente;
