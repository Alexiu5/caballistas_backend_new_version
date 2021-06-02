const config = {
    JWT_SECRET: process.env.JWT_SECRET || 'this-is-my-unhackable-password',
    JWT_EXPIRES_IN: process.env.JWT_SECRET || '10h',
};

module.exports = config;
