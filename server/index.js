const express = require('express');
const cors = require('cors');
const routes = require('./router');

const server = express();

const initServer = function () {
    let hostname = server.get('hostname'),
        port = server.get('port');

    server.listen(port, function () {
        console.log(`Express server running on - http://${hostname}:${port}`);
    });
};

module.exports = function (config) {
    // server settings
    server.set('env', config.env);
    server.set('port', config.port);
    server.set('hostname', config.hostname);

    // returns middleware that parses json
    server.use(cors());
    server.use(express.json());
    server.use(
        express.urlencoded({
            extended: true,
        })
    );
    // server.use(cors);
    // set up routes
    routes.init(server);

    initServer(server);
};
