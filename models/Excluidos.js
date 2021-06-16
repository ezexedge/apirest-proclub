const Sequelize = require('sequelize');
const ClubXusuario = require('./ClubXUsuario')
const db = require('../config/db');

const Excluidos = db.define('excluidos', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    }
    
});



Excluidos.belongsTo(ClubXusuario,{as:"clubxusuario",foreignKey: 'clubxusuarioId'})


module.exports = Excluidos;