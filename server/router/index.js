const api = require('./api')

function init(server) {
    server.get('/', function(req, res) {
        res.send('laksjfdlkajfdkljashd')
    });

    server.use('/api', api)
}

module.exports = {
    init
};
