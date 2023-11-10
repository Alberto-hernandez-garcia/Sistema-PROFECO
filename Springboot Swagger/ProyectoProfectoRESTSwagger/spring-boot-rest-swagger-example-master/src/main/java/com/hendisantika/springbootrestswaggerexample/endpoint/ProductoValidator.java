package com.hendisantika.springbootrestswaggerexample.endpoint;

import com.hendisantika.springbootrestswaggerexample.domain.Producto;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

public class ProductoValidator implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        return Producto.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "nombre", "validation.message.field.required");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "precio", "validation.message.field.required");
        // Agrega más validaciones según sea necesario
    }
}