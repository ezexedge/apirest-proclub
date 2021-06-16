const Sequelize = require('sequelize');
const db = require('../config/db');
const Beneficio = require('../models/Beneficios')
const Club = require('../models/Club')
const Usuario = require('../models/Usuario')

const BeneficioXClub = db.define('beneficioxclub', {
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


BeneficioXClub.belongsTo(Club,{as:"club",foreignKey: 'clubId'})
BeneficioXClub.belongsTo(Usuario,{as:"usuario",foreignKey: 'usuarioId'})
BeneficioXClub.belongsTo(Beneficio,{as:"beneficio",foreignKey: 'beneficioId'})




module.exports = BeneficioXClub;