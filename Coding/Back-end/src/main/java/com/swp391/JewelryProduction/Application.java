package com.swp391.JewelryProduction;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.swp391.JewelryProduction.services.crawl.CrawlDataService;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.FileInputStream;
import java.io.IOException;

@SpringBootApplication
@ComponentScan({"com.swp391.JewelryProduction.security", "com.swp391.JewelryProduction"})
@EnableScheduling
public class Application   {

	private static final Logger logger = LoggerFactory.getLogger(Application.class);

	public static void main(String[] args) throws IOException {
		SpringApplication.run(Application.class, args);
//		ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);
//
//		CrawlDataService crawlDataService = context.getBean(CrawlDataService.class);
//		crawlDataService.crawData();
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(@NotNull CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("*")
						.allowedMethods("HEAD","GET","POST","PUT","DELETE","PATCH","OPTIONS");
			}
		};
	}


//	CommandLineRunner commandLineRunner (AccountRepository accountRepository) {
//		return args -> {
//				logger.info("Application start");
////				Faker faker = new Faker();
////				Random rand = new Random();
////				for (int i = 0; i < 50; i++) {
////					Account account = Account.builder()
////							.email(faker.internet().safeEmailAddress())
////							.password(faker.internet().password())
////							.dateCreated(LocalDateTime.now())
////							.role(Role.CUSTOMER)
////							.build();
////					accountRepository.save(account);
////				}
//
//				Account acc = Account.builder()
//						.email("nguyenhoangdung335@gmail.com")
//						.password("dung111004")
//						.dateCreated(LocalDateTime.now())
//						.role(Role.CUSTOMER)
//						.build();
//				accountRepository.save(acc);
//			acc = Account.builder()
//					.id("ACC00003")
//					.email("nguyenhoangdung335@gmail.com")
//					.password("dung111004")
//					.dateCreated(LocalDateTime.now())
//					.role(Role.CUSTOMER)
//					.build();
//			accountRepository.save(acc);
//		};
//	}
}
