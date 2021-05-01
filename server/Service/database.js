const { Pool } = require("pg");
const { parse } = require("pg-connection-string");

const config = parse(process.env.DATABASE_URL);
config.ssl = {
    rejectUnauthorized: false,
};

const pool = new Pool(config);

const requestQuery = async (query, params) => {
    if (params === undefined) {
        params = [];
    }

    try {
        const client = await pool.connect();
        const raw = await client.query(query, params);

        client.release();
        return raw;
    } catch (err) {
        throw Error("Error trying to request database query", err);
    }
};

module.exports = { pool, requestQuery };
