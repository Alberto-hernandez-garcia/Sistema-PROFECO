package com.proyecto.rest.entity;

public class Libro {
    private Long id;
    private String nombre;
    private String autor;
    private String fechaPublicacion;
    
    public Libro() {
    }

    public Libro(Long id, String nombre, String autor, String fechaPublicacion) {
        this.id = id;
        this.nombre = nombre;
        this.autor = autor;
        this.fechaPublicacion = fechaPublicacion;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getAutor() {
        return autor;
    }
    public void setAutor(String autor) {
        this.autor = autor;
    }
    public String getFechaPublicacion() {
        return fechaPublicacion;
    }
    public void setFechaPublicacion(String fechaPublicacion) {
        this.fechaPublicacion = fechaPublicacion;
    }

    // Constructor, getters y setters

    
}