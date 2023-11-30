const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const path = require('path');
const router = express.Router();
const productoController = require('./controllers/productoController');

const app = express();

//Configuracion HTML

router.get('/tabla', productoController.renderTabla);

//Configuracion HTML

// Configuración de Express y middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Configurar la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');

// Carpeta public para archivos estáticos
app.use(express.static('public'));

// Configuración de las variables de entorno
dotenv.config({ path: './env/.env' });

// MySQL
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://root@localhost:3306/profeco', {
  dialect: 'mysql',
  logging: false, // Puedes habilitar el logging para ver las consultas SQL en la consola
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch(error => {
    console.error('Error de conexión a la base de datos:', error);
    process.exit(1);
  });

module.exports = sequelize;

  // Importa el modelo después de que la conexión esté abierta
  const Producto = require('./models/producto');

  // Middleware para evitar el almacenamiento en caché
  app.use(function (req, res, next) {
    if (!req.user) res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
  });

  // Middleware de rutas para el abarrotes
  const productosRoutes = require('./routes/productos');
  const usuariosRoutes = require('./routes/usuarios');
  app.use('/productos', productosRoutes);
  app.use('/usuarios', usuariosRoutes);
 

  // Middleware de rutas para la autenticación
  const authRoutes = require('./routes/authRoutes');
  app.use('/auth', authRoutes);

  // Middleware de rutas protegidas
  const protectedRoutes = require('./routes/protectedRoutes');
  app.use('/protegido', protectedRoutes);

  // Llamada al router principal
  app.use('/', require('./routes/authRoutes'));

  // Middleware de errores
  const errorHandler = require('./middlewares/errorHandler');
  app.use(errorHandler);

  // Puerto de escucha
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
  });
