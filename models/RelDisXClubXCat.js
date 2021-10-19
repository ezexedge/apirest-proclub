const Sequelize = require('sequelize');
const db = require('../config/db');
const RelDisciplinaXClub = require('./RelDisciplinaXClub')

const RelDisXClubXCat = db.define('reldisciplinaxclubxcategoria', {
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


RelDisXClubXCat.belongsTo(RelDisciplinaXClub,{as:"disciplinaxclub",foreignKey: 'disciplinaxclubId'})






module.exports = RelDisXClubXCat;