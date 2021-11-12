const Sequelize = require('sequelize');
const Rubro = require('./Rubro')
const db = require('../config/db');

const Beneficios = db.define('beneficios', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING(1234) 
    }
    ,
    telefono: {
        type: Sequelize.STRING
    },
    web : {

        type: Sequelize.STRING
    },

    instagram: Sequelize.STRING,
    correo: Sequelize.STRING,
    pathImage: Sequelize.STRING,
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }
});


/* Persona.belongsTo(Direccion,{as:"direccionPersona"})
Persona.belongsTo(TipoDocumento,{as:"tipoDocument"}) */
/* Direccion.hasOne(Persona,{as:"direccionPersona"})

TipoDocumento.hasOne(Persona,{as:"tipoDocument"}) */


module.exports = Beneficios;