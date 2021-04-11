const api = require('./api')

function init(server) {
    server.use('/', function(req, res) {
        res.send('laksjfdlkajfdkljashd')
    });

    server.use('/api', api)
}

module.exports = {
    init
};
