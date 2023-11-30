// models/usuario.js
const { Sequelize, DataTypes } = require('sequelize');

// Configura la conexión a la base de datos MySQL
const sequelize = new Sequelize('mysql://root@localhost:3306/profeco'); // Ajusta según tu configuración

// Define el modelo Usuario
const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    defaultValue: 'usuario',
  },
});

// Sincroniza el modelo con la base de datos
sequelize.sync({ force: false }) // Cambia a true si deseas que las tablas se vuelvan a crear cada vez
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

// Exporta el modelo Usuario
module.exports = Usuario;