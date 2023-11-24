package com.crud.demo.modeloDAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.crud.demo.modelo.Producto;

@Repository
public interface IProductoRepository extends JpaRepository<Producto, Long> {
    // Puedes agregar métodos adicionales si es necesario
}