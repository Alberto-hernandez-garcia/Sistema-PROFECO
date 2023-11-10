package com.profeco.sistemaProfeco.controller;


import com.profeco.sistemaProfeco.entity.Producto;
import com.profeco.sistemaProfeco.repository.ProductosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/producto")
public class ProductoController {

    @Autowired
    private ProductosRepository repository;

    @GetMapping
    public List<Producto> getAllProductos() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable("id") Long id) {
        Optional<Producto> productoData = repository.findById(id);

        return productoData.map(producto -> new ResponseEntity<>(producto, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> modifyProductoById(@PathVariable("id") Long id, @Valid @RequestBody Producto productos) {
        Optional<Producto> productoData = repository.findById(id);
        if (productoData.isPresent()) {
            Producto existingProducto = productoData.get();
            existingProducto.setPrecio(productos.getPrecio());
            existingProducto.setDescripcion(productos.getDescripcion());
            existingProducto.setCategoria(productos.getCategoria());

            repository.save(existingProducto);
            return new ResponseEntity<>("Producto has been updated!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Producto not found!", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<String> createProducto(@Valid @RequestBody Producto productos) {
        repository.save(productos);
        return new ResponseEntity<>("Producto has been created!", HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProducto(@PathVariable Long id) {
        repository.deleteById(id);
        return new ResponseEntity<>("Producto has been deleted!", HttpStatus.OK);
    }

    @DeleteMapping("/all")
    public ResponseEntity<String> deleteAllProductos() {
        repository.deleteAll();
        return new ResponseEntity<>("All Producto have been deleted!", HttpStatus.OK);
    }
}
