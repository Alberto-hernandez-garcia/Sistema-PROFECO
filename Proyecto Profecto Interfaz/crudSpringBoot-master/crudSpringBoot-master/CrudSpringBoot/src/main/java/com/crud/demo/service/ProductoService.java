package com.crud.demo.service;

import java.util.List;
import java.util.Optional;

import com.crud.demo.serviceInterface.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.crud.demo.modelo.Producto;
import com.crud.demo.modeloDAO.IProductoRepository;

@Service
@Transactional
public class ProductoService implements IProductoService {

	@Autowired
	private IProductoRepository repository;

	@Transactional(readOnly = true)
	public List<Producto> listar() {
		return repository.findAll();
	}

	@Transactional(readOnly = true)
	public Optional<Producto> listarId(Long id) {
		return repository.findById(id);
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