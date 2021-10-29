const Sequelize = require('sequelize');
const Rubro = require('./Rubro')
const db = require('../config/db');
const Club = require('../models/Club')
const Notificacion = require('../models/Notificacion')
const Usuario = require('../models/Usuario')
const Encuesta = require('../models/Encuesta')

const EncuestaXClub = db.define('encuestaxclub', {
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


EncuestaXClub.belongsTo(Club,{as:"club",foreignKey: 'clubId'})
EncuestaXClub.belongsTo(Encuesta,{as:"encuesta",foreignKey: 'encuestaId'})

module.exports = EncuestaXClub;