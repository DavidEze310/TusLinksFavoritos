const mysql = require('mysql');
const {promisify} = require('util');
const { database } = require('./keys');
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('LA CONECCIÓN CON LA BASE DE DATOS SE CERRÓ');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE MUCHAS CONECCIONES');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('LA CONECCION CON LA BASE DE DATOS FUE NEGADA');
        }
    }
    if(connection) connection.release();
    console.log('SE CONECTO CON LA BASE DE DATOS');
    return;
});

pool.query = promisify(pool.query);
module.exports = pool;

