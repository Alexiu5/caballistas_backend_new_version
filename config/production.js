const config = {
    env: 'production',
    port: process.env.PORT || 8030,
    hostname: process.env.HOSTNAME || 'production',
    database: {
        user: 'postgres',
        host: 'localhost',
        password: 'games123',
        database: 'postgres',
        port: '5432',
    },
    email: {
        host: 'smtp.mailtrap.io',
        port: 465,
        secure: false,
        auth: {
            user: '0d3bc85d08a064',
            pass: '64728e1bd3455b',
        },
    },
    emailDefaultCredentials: {
        emailFrom: 'karenchiquito.serna@gmail.com',
        subject: 'Confirmación de email',
    },
};

module.exports = config;
