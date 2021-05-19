const env = process.env.NODE_ENV || 'local';
const envString = `./${env}`;
const config = require(envString);

module.exports = config;
