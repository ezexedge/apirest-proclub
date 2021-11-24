const Sequelize = require('sequelize');
const db = require('../config/db');
const Club = require('./Club');

const Rubro = db.define('rubro', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING,
    
    pertenece_superadmin:{
        type: Sequelize.INTEGER
    }
     

    
});



Rubro.belongsTo(Club,{as:"club",foreignKey: 'clubId'})




module.exports = Rubro;