package com.YoloCamping;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class YoloCampingApplication {

	public static void main(String[] args) {
		SpringApplication.run(YoloCampingApplication.class, args);
	}

}
