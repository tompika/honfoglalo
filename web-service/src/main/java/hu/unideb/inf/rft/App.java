package hu.unideb.inf.rft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication(scanBasePackages={"hu.unideb.inf.rft"})// same as @Configuration @EnableAutoConfiguration @ComponentScan combined
public class App {

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
}
