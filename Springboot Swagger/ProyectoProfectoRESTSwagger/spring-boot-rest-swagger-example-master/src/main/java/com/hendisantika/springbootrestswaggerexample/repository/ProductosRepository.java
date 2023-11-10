package com.hendisantika.springbootrestswaggerexample.repository;

import com.hendisantika.springbootrestswaggerexample.domain.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductosRepository extends JpaRepository<Producto, Long> {
    // Puedes dejar este espacio en blanco si no necesitas agregar métodos adicionales
}