package com.crud.demo.controler;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.crud.demo.modelo.Producto;
import com.crud.demo.serviceInterface.IProductoService;

import java.util.Comparator;
import java.util.List;

@Controller
@RequestMapping("/productos")
public class ProductoControler {


	private IProductoService productoService;

	@Autowired
	public ProductoControler(IProductoService productoService) {
		this.productoService = productoService;
	}

	@GetMapping("/listar")
	public String listar(Model model) {
		// Obtener la lista de productos desde el servicio
		List<Producto> productos = productoService.listar();

		// Ordenar la lista de productos por ID
		productos.sort(Comparator.comparing(Producto::getId));

		// Agregar la lista ordenada al modelo
		model.addAttribute("productos", productos);

		// Retornar el nombre de la vista
		return "index";
	}

	@GetMapping("/listar/{id}")
	public String listarId(@PathVariable Long id, Model model) {
		model.addAttribute("producto", productoService.listarId(id));
		return "form";
	}

	@GetMapping("/new")
	public String nuevo(Model model) {
		model.addAttribute("producto", new Producto());
		return "form";
	}

	@PostMapping("/save")
	public String save(@Valid Producto producto, Model model) {
		productoService.save(producto);
		return "redirect:/productos/listar";
	}

	@GetMapping("/delete/{id}")
	public String eliminar(@PathVariable Long id, Model model) {
		productoService.delete(id);
		return "redirect:/productos/listar";
	}
}
