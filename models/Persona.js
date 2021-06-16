const Sequelize = require('sequelize');
const Direccion = require('./Direccion')
const TipoDocumento = require('./TipoDocumento')
const db = require('../config/db');

const Persona = db.define('persona', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: {
        type: Sequelize.STRING
    },
    apellido: {
        type: Sequelize.STRING
    }
    ,
    documento: {
        type: Sequelize.STRING
    },
    sexo : {

        type: Sequelize.STRING
    },

    avatar: Sequelize.STRING,
    correo: Sequelize.STRING,
    telefono: Sequelize.STRING,
    fechaNacimiento: Sequelize.STRING

});


/* Persona.belongsTo(Direccion,{as:"direccionPersona"})
Persona.belongsTo(TipoDocumento,{as:"tipoDocument"}) */
/* Direccion.hasOne(Persona,{as:"direccionPersona"})

TipoDocumento.hasOne(Persona,{as:"tipoDocument"}) */
Persona.belongsTo(Direccion,{as:"direccionPersona",foreignKey: 'direccionPersonaId'})

Persona.belongsTo(TipoDocumento,{as:"tipoDocument",foreignKey: 'tipoDocumentId'})



module.exports = Persona;