const Sequelize = require('sequelize');
const Usuario = require('./Usuario')
const Club = require('./Club')
const db = require('../config/db');
const Estados = require('../models/Estados')
const Rol = require('../models/rol')


const ClubXusuario = db.define('clubxusuario', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 0
    }
     
});




ClubXusuario.belongsTo(Club,{as:"club",foreignKey: 'clubId'})
ClubXusuario.belongsTo(Rol,{as:"rol",foreignKey: 'rolId'})
ClubXusuario.belongsTo(Rol,{as:"rolanterior",foreignKey: 'rolanteriorId'})




ClubXusuario.belongsTo(Usuario,{as:"usuario",foreignKey: 'usuarioId'})
//Usuario.belongsTo(Persona,{as:"persona"})
ClubXusuario.belongsTo(Estados,{as:"estado",foreignKey: 'estadoId'})












module.exports = ClubXusuario;