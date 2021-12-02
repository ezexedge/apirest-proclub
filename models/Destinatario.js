const Sequelize = require('sequelize');
const Encuesta = require('../models/Encuesta')
const Usuario = require('../models/Usuario')
const Club = require('../models/Club')
const db = require('../config/db');

const Destinatario = db.define('destinatario', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    
});


Destinatario.belongsTo(Encuesta,{as:"encuesta",foreignKey: 'encuestId'})
Destinatario.belongsTo(Usuario,{as:"usuario",foreignKey: 'usuarioId'})
Destinatario.belongsTo(Usuario,{as:"enviadoPor",foreignKey: 'enviadoporId'})
Destinatario.belongsTo(Club,{as:"club",foreignKey: 'clubId'})



module.exports = Destinatario;