const { Sequelize, DataTypes } = require('sequelize');

// Configura la conexión a la base de datos MySQL
const sequelize = new Sequelize('mysql://root@localhost:3306/profeco'); // Ajusta según tu configuración

// Define el objeto Profeco que contendrá los modelos Producto y Usuario
const Profeco = {};

// Define el modelo Producto
Profeco.Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  nombre: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  codigoBarras: DataTypes.STRING,
  precioCompra: DataTypes.FLOAT,
  precioVenta: DataTypes.FLOAT,
  existencias: DataTypes.INTEGER,
  proveedor: DataTypes.STRING,
  categoria: DataTypes.STRING,
});

// Define el modelo Usuario
Profeco.Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
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

// Sincroniza los modelos con la base de datos
sequelize.sync({ force: false }) // Cambia a true si deseas que las tablas se vuelvan a crear cada vez
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

// Exporta el objeto Profeco con los modelos Producto y Usuario
module.exports = Profeco;