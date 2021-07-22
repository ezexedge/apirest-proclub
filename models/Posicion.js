const Sequelize = require('sequelize');
const db = require('../config/db');
const  Disciplina = require('../models/Disciplina')
const Posicion = db.define('posicion', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING,
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }

    
});





Posicion.belongsTo(Disciplina,{as:"disciplina",foreignKey: 'disciplinaId'})

module.exports = Posicion;