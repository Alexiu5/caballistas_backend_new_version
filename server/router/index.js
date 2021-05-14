const api = require('./api');

function init(server) {
    server.get('/', function (req, res) {
        res.send('Server running');
    });

    server.use('/api', api);
}

module.exports = {
    init,
};
