const { Pool } = require('pg')
const { parse } = require('pg-connection-string')

const config = parse(process.env.DATABASE_URL)
config.ssl = {
    rejectUnauthorized: false
}

const pool = new Pool(config)
module.exports = pool;