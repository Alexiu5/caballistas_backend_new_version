const config = {
    env: 'local',
    port: process.env.PORT || 8030,
    hostname: process.env.HOSTNAME || 'localhost',
    database: {
        user: 'postgres',
        host: 'localhost',
        password: 'games123',
        database: 'postgres',
        port: '5432',
    },
    email: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        secure: false,
        auth: {
            user: '7ca8b6248ddc54',
            pass: '2487de3fb5f0de',
        },
    },
    emailDefaultCredentials: {
        emailFrom: 'karenchiquito.serna@gmail.com',
        subject: 'Confirmación de email',
    },
};

module.exports = config;
