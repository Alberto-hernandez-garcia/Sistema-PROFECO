package com.hendisantika.springbootrestswaggerexample;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class SpringBootRestSwaggerExampleApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootRestSwaggerExampleApplication.class, args);
	}
}
