package com.proyecto.rest;

import com.proyecto.rest.entity.Producto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/producto")
public class ProductoController {

    private List<Producto> productos = new ArrayList<>();

    // Obtener todos los productos
    @GetMapping
    public ResponseEntity<List<Producto>> obtenerTodos() {
        return ResponseEntity.ok(productos);
    }


    // Obtener producto por nombre
    @GetMapping("/producto/{nombre}")
    public ResponseEntity<Producto> obtenerPorNombre(@PathVariable String nombre) {
        Producto productoPorNombre = productos.stream()
                .filter(producto -> producto.getNombre().equals(nombre))
                .findFirst()
                .orElse(null);

        if (productoPorNombre != null) {
            return ResponseEntity.ok(productoPorNombre);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Guardar producto
    @PostMapping
    public ResponseEntity<Producto> guardarProducto(@RequestBody Producto nuevoProducto) {
        nuevoProducto.setId((long) (productos.size() + 1));
        productos.add(nuevoProducto);
        return ResponseEntity.ok(nuevoProducto);
    }

    // Actualizar producto
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarLibro(@PathVariable Long id, @RequestBody Producto productoActualizado) {
        Producto productoExistente = productos.stream()
                .filter(producto -> producto.getId().equals(id))
                .findFirst()
                .orElse(null);

        if (productoExistente != null) {
            productoExistente.setNombre(productoActualizado.getNombre());
            productoExistente.setPrecio(productoActualizado.getPrecio());
            productoExistente.setDescripcion(productoActualizado.getDescripcion());
            productoExistente.setCategoria(productoActualizado.getCategoria());
            return ResponseEntity.ok(productoExistente);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Eliminar producto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        productos.removeIf(producto -> producto.getId().equals(id));
        return ResponseEntity.ok().build();
    }
}