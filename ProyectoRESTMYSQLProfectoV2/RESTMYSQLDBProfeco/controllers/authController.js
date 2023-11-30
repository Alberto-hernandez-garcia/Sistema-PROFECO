const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const Profeco = require('../models/profeco');
const Usuario = require('../models/usuario');
const { promisify } = require('util');

exports.register = async (req, res) => {
  try {
    const { username, password, rol } = req.body;
    const passHash = await bcryptjs.hash(password, 8);

    // Usa el modelo Usuario para crear un nuevo usuario
    await Profeco.Usuario.create({ username, password: passHash, rol });

    // Redirigir al usuario a la página de inicio de sesión después de un registro exitoso
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el registro');
  }
};

exports.login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).render('login', {
        alert: true,
        alertTitle: 'Advertencia',
        alertMessage: 'Ingrese un usuario y contraseña',
        alertIcon: 'info',
        showConfirmButton: true,
        timer: false,
        ruta: 'login',
      });
    }

    // Utiliza Model.findOne en lugar de Profeco.findOne
    const userDocument = await Profeco.Usuario.findOne({ where: { username } });

    if (!userDocument || !(await bcryptjs.compare(password, userDocument.password))) {
      return res.status(401).render('login', {
        alert: true,
        alertTitle: 'Error',
        alertMessage: 'Usuario y/o contraseña incorrectos',
        alertIcon: 'error',
        showConfirmButton: true,
        timer: false,
        ruta: 'login',
      });
    }

    const id = userDocument.id;
    const token = jwt.sign({ id }, process.env.JWT_SECRETO, {
      expiresIn: process.env.JWT_TIEMPO_EXPIRA,
    });

    const cookiesOptions = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie('jwt', token, cookiesOptions);
    console.log('TOKEN: ' + token + ' para el USUARIO : ' + username);

    res.render('login', {
      alert: true,
      alertTitle: 'Conexión exitosa',
      alertMessage: '¡Inicio de sesión correcto!',
      alertIcon: 'success',
      showConfirmButton: false,
      timer: 800,
      ruta: '',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el inicio de sesión');
  }
};

exports.isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );

      // Utiliza Usuario.findByPk en lugar de Profeco.findByPk
      const userDocument = await Usuario.findByPk(decodificada.id);

      if (!userDocument) {
        return next();
      }

      req.user = userDocument;
      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).send('Token no válido');
    }
  } else {
    res.redirect('/login');
  }
};

exports.logout = (req, res) => {
  res.clearCookie('jwt');
  return res.redirect('/');
};