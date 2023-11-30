const { Sequelize, DataTypes } = require('sequelize');

// Configura la conexión a la base de datos MySQL
const sequelize = new Sequelize('mysql://root@localhost:3306/profeco'); // Ajusta según tu configuración

// Define el modelo Producto
const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: DataTypes.STRING,
  codigoBarras: {
    type: DataTypes.STRING,
    unique: true,
  },
  precioCompra: DataTypes.FLOAT,
  precioVenta: DataTypes.FLOAT,
  existencias: DataTypes.INTEGER,
  proveedor: DataTypes.STRING,
  categoria: DataTypes.STRING,
});

// Sincroniza el modelo con la base de datos
sequelize.sync({ force: false }) // Cambia a true si deseas que las tablas se vuelvan a crear cada vez
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

// Exporta el modelo Producto
module.exports = Producto;