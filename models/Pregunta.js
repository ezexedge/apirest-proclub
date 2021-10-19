const Sequelize = require('sequelize');
const db = require('../config/db');
const Encuesta = require('../models/Encuesta')
const Pregunta = db.define('pregunta', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    titulo: Sequelize.STRING,
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }


    
});


Pregunta.belongsTo(Encuesta,{as:"encuesta",foreignKey: 'encuestaId'})






module.exports = Pregunta;