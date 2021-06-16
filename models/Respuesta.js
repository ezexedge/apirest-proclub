const Sequelize = require('sequelize');
const db = require('../config/db');
const Pregunta = require('../models/Pregunta')

const Respuesta = db.define('respuesta', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    titulo: Sequelize.STRING,
    contadorDeRespuestas:{
        type: Sequelize.INTEGER,   
        defaultValue: 0
    },
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }


    
});


Respuesta.belongsTo(Pregunta,{as:"pregunta",foreignKey: 'preguntaId'})






module.exports = Respuesta;