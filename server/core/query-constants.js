const infoClient = {
    findById: 'SELECT * FROM INFORMACION_CLIENTE WHERE ID_CLIENTE =$1',
    findByDocType: 'SELECT * FROM informacion_cliente WHERE TIPO_DOCUMENTO=$1 AND NUMERO_DOCUMENTO=$2',
    register: 'INSERT INTO INFORMACION_CLIENTE  (ID_CLIENTE, NOMBRES, APELLIDOS, TIPO_DOCUMENTO, NUMERO_DOCUMENTO, TELEFONO, DIRECCION, ID_DEPARTAMENTO, ID_MUNICIPIO) VALUES(nextval($1), $2, $3, $4, $5, $6, $7, $8, $9)',
}

const user = {
    findById: 'SELECT * FROM USUARIO_SISTEMA WHERE ID_USUARIO = $1',
    findByDocument: 'SELECT * FROM INFORMACION_CLIENTE WHERE TIPO_DOCUMENTO = $1 AND NUMERO_DOCUMENTO = $2',
    findByEmail: 'SELECT * FROM USUARIO_SISTEMA WHERE CORREO = $1',
    register: 'INSERT INTO USUARIO_SISTEMA (ID_USUARIO, TIPO_USUARIO, CLIENTE, CORREO, CONTRASENA, TIPO_ESTADO) VALUES (nextval($1), 2, $2, $3, "", 3 )',
    update: 'UPDATE USUARIO_SISTEMA SET CONTRASENA= $1, TIPO_ESTADO= $2, CORREO= $3 WHERE ID_USUARIO= $4',
    delete: 'UPDATE USUARIO_SISTEMA SET TIPO_ESTADO= $1 WHERE CLIENTE= $2'
}


module.exports = {
    infoClient,
    user
}