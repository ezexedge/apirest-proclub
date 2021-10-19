const Sequelize = require('sequelize');
const db = require('../config/db');
const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')

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


Posicion.belongsTo(RelDisciplinaXClub,{as:"disciplinaxclub",foreignKey: 'disciplinaxclubId'})






module.exports = Posicion;