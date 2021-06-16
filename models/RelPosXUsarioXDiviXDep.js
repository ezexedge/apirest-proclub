const Sequelize = require('sequelize');
const db = require('../config/db');
const RelDisXClubXCat = require('./RelDisXClubXCat')

const RelPosXUsuarioXDivXDep = db.define('relposxusuarioxdivxdep', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING,
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }

    
});


RelPosXUsuarioXDivXDep.belongsTo(RelDisXClubXCat,{as:"disxclubxcat",foreignKey: 'disxclubxcatId'})






module.exports = RelPosXUsuarioXDivXDep;