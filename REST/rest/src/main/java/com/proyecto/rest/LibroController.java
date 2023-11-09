package com.proyecto.rest;

import com.proyecto.rest.entity.Libro;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/libros")
public class LibroController {

    private List<Libro> libros = new ArrayList<>();

    // Obtener todos los libros
    @GetMapping
    public ResponseEntity<List<Libro>> obtenerTodos() {
        return ResponseEntity.ok(libros);
    }

    // Obtener libros por autor
    @GetMapping("/autor/{autor}")
    public ResponseEntity<List<Libro>> obtenerPorAutor(@PathVariable String autor) {
        List<Libro> librosPorAutor = libros.stream()
                .filter(libro -> libro.getAutor().equals(autor))
                .collect(Collectors.toList());
        return ResponseEntity.ok(librosPorAutor);
    }

    // Obtener libro por nombre
    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<Libro> obtenerPorNombre(@PathVariable String nombre) {
        Libro libroPorNombre = libros.stream()
                .filter(libro -> libro.getNombre().equals(nombre))
                .findFirst()
                .orElse(null);

        if (libroPorNombre != null) {
            return ResponseEntity.ok(libroPorNombre);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Guardar libro
    @PostMapping
    public ResponseEntity<Libro> guardarLibro(@RequestBody Libro nuevoLibro) {
        nuevoLibro.setId((long) (libros.size() + 1));
        libros.add(nuevoLibro);
        return ResponseEntity.ok(nuevoLibro);
    }

    // Actualizar libro
    @PutMapping("/{id}")
    public ResponseEntity<Libro> actualizarLibro(@PathVariable Long id, @RequestBody Libro libroActualizado) {
        Libro libroExistente = libros.stream()
                .filter(libro -> libro.getId().equals(id))
                .findFirst()
                .orElse(null);

        if (libroExistente != null) {
            libroExistente.setNombre(libroActualizado.getNombre());
            libroExistente.setAutor(libroActualizado.getAutor());
            libroExistente.setFechaPublicacion(libroActualizado.getFechaPublicacion());
            return ResponseEntity.ok(libroExistente);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Eliminar libro
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarLibro(@PathVariable Long id) {
        libros.removeIf(libro -> libro.getId().equals(id));
        return ResponseEntity.ok().build();
    }
}