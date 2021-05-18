const { requestQuery } = require('../Service/database');
const Query = require('./query-constants');
const { handleServerError, handleOk } = require('../core');

class Role {
    constructor({ id, name }) {
        this.id = id;
        this.name = name;
    }
}

const getRoles = async (req, res) => {
    try {
        let roles = await findAll();
        handleOk(res, roles);
    } catch (error) {
        handleServerError(res);
    }
};

const findAll = async () => {
    let roles = await (await requestQuery(Query.roles.findALl)).rows;
    const response = roles.map((role) => parseRole(role.row));

    return response;
};

const parseRole = (role) => {
    let e = role.replace(/\(|\)/g, '');
    e = e.split(',');
    return new Role({
        id: e[0],
        name: e[1],
    });
};

module.exports = {
    Role,
    getRoles,
    findAll,
};
