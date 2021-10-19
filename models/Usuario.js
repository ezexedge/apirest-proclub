const Sequelize = require('sequelize');
const Persona = require('./Persona')
const db = require('../config/db');

const Usuario = db.define('usuario', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    idFirebase: Sequelize.STRING
    ,
    idDevice: Sequelize.STRING,
    ultimoIngreso: Sequelize.STRING,
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }
     
});




Usuario.belongsTo(Persona,{as:"persona",foreignKey: 'personaId'})


// Métodos personalizados
Usuario.prototype.verificarPassword = function(password) {
    return password === this.password;
}







module.exports = Usuario;