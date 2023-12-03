const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');
const generateUniqueId = require('./generateUniqueId');

// Configura la conexión a la base de datos MySQL
const sequelize = new Sequelize('mysql://root@localhost:3306/profeco'); // Ajusta según tu configuración

// Define el modelo Usuario para Sequelize
const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
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
    allowNull: false,
  },
});

// Sincroniza el modelo con la base de datos
sequelize.sync({ force: false }) // Cambia a true si deseas que las tablas se vuelvan a crear cada vez
  .then(() => {
    console.log('Modelo Usuario sincronizado con la base de datos');
  })
  .catch((error) => {
    console.error('Error al sincronizar el modelo Usuario:', error);
  });

const secretKey = process.env.SECRET_KEY || 'tu-secreto-seguro';
const expiresIn = 60; // 60 segundos (1 minuto)

const generateToken = (userId) => {
  return jwt.sign({ user: userId }, secretKey, { expiresIn });
};

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener todos los usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getUsuarioById = async (req, res) => {
  const usuarioId = req.params.id;

  try {
    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error('Error al buscar el usuario por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.addUsuario = async (req, res) => {
  try {
    const { username, password, rol } = req.body;

    if (!username || !password || !rol) {
      return res.status(400).json({ error: 'Datos incompletos para el usuario' });
    }

    const uniqueId = generateUniqueId();

    const nuevoUsuario = await Usuario.create({
      id: uniqueId,
      username,
      password,
      rol,
    });

    const token = generateToken(uniqueId);

    res.status(201).json({ usuario: nuevoUsuario, token });
  } catch (error) {
    console.error('Error al agregar el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const updatedData = req.body;

    const usuarioActualizado = await Usuario.findByPk(usuarioId);

    if (!usuarioActualizado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await usuarioActualizado.update(updatedData);

    res.json({ success: true, message: 'Usuario actualizado correctamente', usuario: usuarioActualizado });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.id;

    const usuarioEliminado = await Usuario.findByPk(usuarioId);

    if (!usuarioEliminado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await usuarioEliminado.destroy();

    res.json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};