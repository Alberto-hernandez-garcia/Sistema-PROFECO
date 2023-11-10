package com.kominfo.halaqohit.springbootdatajpamongodb.repository;

import com.kominfo.halaqohit.springbootdatajpamongodb.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductosRepository extends JpaRepository<Producto, Long> {
    Optional<Producto> findById(Long id);

    List<Producto> findAll();
}