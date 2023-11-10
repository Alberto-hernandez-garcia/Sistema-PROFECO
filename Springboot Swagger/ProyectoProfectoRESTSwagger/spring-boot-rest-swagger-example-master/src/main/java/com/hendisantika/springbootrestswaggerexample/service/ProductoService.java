package com.hendisantika.springbootrestswaggerexample.service;

import com.hendisantika.springbootrestswaggerexample.domain.Producto;
import com.hendisantika.springbootrestswaggerexample.repository.ProductosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by IntelliJ IDEA.
 * User: hendisantika
 * Email: hendisantika@gmail.com
 * Telegram : @hendisantika34
 * Date: 9/4/17
 * Time: 11:50 AM
 * To change this template use File | Settings | File Templates.
 */

@Service
@Transactional
public class ProductoService {

    @Autowired
    private ProductosRepository repository;

    @Transactional(readOnly = true)
    public Page<Producto> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Producto findOne(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Producto save(Producto producto) {
        return repository.saveAndFlush(producto);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public void deleteAll() {
        repository.deleteAll();
    }
}