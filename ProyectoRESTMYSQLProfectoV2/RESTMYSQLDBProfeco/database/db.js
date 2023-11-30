const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT || 3306,
  dialect: 'mysql',
  logging: false, // Puedes habilitar el logging para ver las consultas SQL en la consola
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch(error => {
    console.error('Error de conexión a la base de datos:', error);
  });

module.exports = sequelize;