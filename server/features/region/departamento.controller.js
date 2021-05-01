const { requestQuery } = require('../../Service/database');

async function find(req, res) {
    try {
        const result = await requestQuery('SELECT * FROM tipo_departamento');
        const results = { results: result ? result.rows : null };
        res.status(200).send(results);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

async function findById(req, res) {
    const { tipo_departamento } = req.params;

    try {
        const result = await requestQuery(
            `SELECT * FROM tipo_departamento WHERE TIPO_DOCUMENTO = ${tipo_departamento}`
        );
        const results = { results: result ? result.rows : null };
        res.status(200).send(results);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

module.exports = {
    find,
    findById,
};
