const Sequelize = require('sequelize');
const db = require('../config/db');
const Usuario = require('../models/Usuario')
const Respuesta = require('../models/Respuesta')

const RespuestaUsuario = db.define('respuesta', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    }


    
});


RespuestaUsuario.belongsTo(Usuario,{as:"usuario",foreignKey: 'usuarioId'})
RespuestaUsuario.belongsTo(Respuesta,{as:"respuesta",foreignKey: 'respuestaId'})






module.exports = RespuestaUsuario;