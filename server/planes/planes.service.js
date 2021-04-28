"use strict";
const PlanSuscripcion = require('./planes.model');
const pool = require('../Service/database');

// Register new plan Suscripcion
async function registerPlanSuscripcion(params) {
	const query = 'INSERT INTO TIPO_PLAN_SUSCRIPCION (ID_PLAN_SUSCRIPCION, NOMBRE_PLAN, VALOR_PLAN, FECHA_ACTUALIZACION, INFORMACION_PLAN, ACTIVO) VALUES(nextval($1), $2, $3, $4, $5, $6)';
	const planes = new PlanSuscripcion(params).toArray();

	planes[0] = 'tipo_plan_suscripcion_id_plan_suscripcion_seq';

	try {
		const client = await pool.connect();
		const result = await client.query(query, planes);
		const results = {result: result ? result.rows: null};

		client.release();
		return results;

	} catch (e) {
		throw new Error(e);
	}
}

async function findPlanesSuscripcion() {
	const query = 'SELECT * FROM TIPO_PLAN_SUSCRIPCION WHERE ACTIVO = $1';
	const activo = "S";

	try {
		const client = await pool.connect();
		const result = await client.query(query, [activo]);
		const results = {result: result ? result.rows: null};

		client.release();
		return results;
	} catch (e) {
		throw new Error(e);
	}
}

async function deletePlanSuscripcionById({ id_plan_suscripcion }) {
	const query = 'UPDATE TIPO_PLAN_SUSCRIPCION SET ACTIVO = $2 WHERE ID_PLAN_SUSCRIPCION = $1';
	const activo = "N";

	try {
		const client = await pool.connect();
		const result = await client.query(query, [id_plan_suscripcion, activo]);
		const results = {result: result ? result.rows: null};

		client.release();
		return results;
	} catch (e) {
		throw new Error(e);
	}
}

async function updatePlanSuscripcionById({id_plan_suscripcion, nombre_plan, valor_plan, fecha_actualizacion, informacion_plan}) {
	const values = [id_plan_suscripcion, nombre_plan, valor_plan, fecha_actualizacion, informacion_plan]
	const query = 'UPDATE TIPO_PLAN_SUSCRIPCION SET NOMBRE_PLAN = $2, VALOR_PLAN = $3, FECHA_ACTUALIZACION = $4, INFORMACION_PLAN = $5  WHERE ID_PLAN_SUSCRIPCION = $1';
	try {
		const client = await pool.connect();
		const result = await client.query(query, values);
		const results = {result: result ? result.rows: null};

		client.release();
		return results;
	} catch (e) {
		throw new Error(e);
	}
}


module.exports = {
	registerPlanSuscripcion,
	findPlanesSuscripcion,
	deletePlanSuscripcionById,
	updatePlanSuscripcionById
}