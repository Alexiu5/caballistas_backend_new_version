"use strict";
class PlanSuscripcion { 
    constructor(planSuscripcion) {
        this.id_plan_suscripcion = planSuscripcion.id_plan_suscripcion
        this.nombre_plan = planSuscripcion.nombre_plan
        this.valor_plan  = planSuscripcion.valor_plan
        this.fecha_actualizacion  = planSuscripcion.fecha_actualizacion
        this.informacion_plan  = planSuscripcion.informacion_plan
        this.activo = planSuscripcion.activo
    }
};

PlanSuscripcion.prototype.toArray = function() {
    return [
        this.id_planSuscripcion,
        this.nombre_plan,
        this.valor_plan,
        this.fecha_actualizacion,
        this.informacion_plan,
        this.activo
    ];
};

module.exports = PlanSuscripcion;
