const Sequelize = require('sequelize');
const Direccion = require('./Direccion')
const Persona = require('./Persona')
const db = require('../config/db');

const Club = db.define('club', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: {
        type: Sequelize.STRING

    },
    descripcion: {
        type: Sequelize.STRING
    }
    , logo: {
        type: Sequelize.STRING
    }
    ,
    colorPrimario: Sequelize.STRING,
    colorTextoPrimario: Sequelize.STRING,
    colorSecundario: Sequelize.STRING,
    colorTextoSecundario: Sequelize.STRING,
    activo: Sequelize.INTEGER

    
});


Club.belongsTo(Direccion,{as:"direccion",foreignKey: 'direccionId'})
Club.belongsTo(Persona,{as:"persona",foreignKey: 'personaId'})



module.exports = Club;