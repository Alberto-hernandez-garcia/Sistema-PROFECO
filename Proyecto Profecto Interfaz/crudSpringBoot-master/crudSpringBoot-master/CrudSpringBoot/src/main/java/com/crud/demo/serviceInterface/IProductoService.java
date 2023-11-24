package com.crud.demo.serviceInterface;

import java.util.List;
import java.util.Optional;
import com.crud.demo.modelo.Producto;
import org.springframework.stereotype.Service;

@Service
public interface IProductoService {
	public List<Producto> listar();

	public Optional<Producto> listarId(Long id);

	public Producto save(Producto producto);

	public void delete(Long id);
}