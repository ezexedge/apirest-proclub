const Sequelize = require('sequelize');
const db = require('../config/db');
const Usuario = require('../models/Usuario')
const Respuesta = require('../models/Respuesta')
const Encuesta = require('../models/Encuesta')

const RespuestaUsuario = db.define('respuestaUsuario', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }


    
});


RespuestaUsuario.belongsTo(Usuario,{as:"usuario",foreignKey: 'usuarioId'})
RespuestaUsuario.belongsTo(Respuesta,{as:"respuesta",foreignKey: 'respuestaId'})
RespuestaUsuario.belongsTo(Encuesta,{as:"encuesta",foreignKey: 'encuestaId'})






module.exports = RespuestaUsuario;