const Sequelize = require('sequelize');
const db = require('../config/db');
const ClubXUsuario = require('./ClubXUsuario')
const EstadoDocumento = require('./EstadoDocumento')

const Documentacion = db.define('documentacion', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    pathFile: {
        type: Sequelize.STRING
    },
    fechaSubido: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
    },
    
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }
});


Documentacion.belongsTo(ClubXUsuario,{as:"clubxusuario",foreignKey: 'clubxusuarioId'})
Documentacion.belongsTo(EstadoDocumento,{as:"estadodocumento",foreignKey: 'estadodocumentoId'})


module.exports = Documentacion;