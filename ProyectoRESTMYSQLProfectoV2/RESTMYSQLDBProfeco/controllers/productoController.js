const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const generateUniqueId = require('./generateUniqueId');

const sequelize = new Sequelize('mysql://root@localhost:3306/profeco'); // Ajusta según tu configuración

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigoBarras: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precioCompra: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  precioVenta: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  existencias: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  proveedor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('Modelo Producto sincronizado con la base de datos');
  })
  .catch((error) => {
    console.error('Error al sincronizar el modelo Producto:', error);
  });

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Producto.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error al obtener todos los productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Producto.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error al buscar el producto por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const {
      id,
      nombre,
      descripcion,
      codigoBarras,
      precioCompra,
      precioVenta,
      existencias,
      proveedor,
      categoria,
    } = req.body;

    if (
      !nombre ||
      !descripcion ||
      !codigoBarras ||
      isNaN(precioCompra) ||
      isNaN(precioVenta) ||
      isNaN(existencias) ||
      typeof proveedor !== 'string' ||
      !categoria
    ) {
      return res.status(400).json({ error: 'Los datos del producto son inválidos.' });
    }

    const nuevoProducto = await Producto.create({
      id: id || generateUniqueId(),
      nombre,
      descripcion,
      codigoBarras,
      precioCompra,
      precioVenta,
      existencias,
      proveedor,
      categoria,
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    res.status(500).send('Error al agregar el producto');
  }
};

exports.editProductPage = async (req, res) => {
  try {
    const productId = req.params.id;
    const producto = await Producto.findByPk(productId);

    if (!producto) {
      return res.status(404).send('Producto no encontrado');
    }

    res.render('productos/actualizar', { producto: producto });
  } catch (error) {
    console.error('Error al cargar la página de edición:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id, nombre, descripcion, codigoBarras, precioCompra, precioVenta, existencias, proveedor, categoria } = req.body;

    const productoActualizado = await Producto.findByPk(id);

    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await productoActualizado.update({
      nombre,
      descripcion,
      codigoBarras,
      precioCompra,
      precioVenta,
      existencias,
      proveedor,
      categoria,
    });

    res.json({ success: true, message: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error('Error en el controlador de actualización:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor al actualizar el producto' });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await Producto.destroy({
      where: {
        id: productId,
      },
    });

    if (!result) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ message: 'Hubo un problema al eliminar el producto' });
  }
};

exports.renderTabla = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.render('productos/tabla', { productos: productos });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};