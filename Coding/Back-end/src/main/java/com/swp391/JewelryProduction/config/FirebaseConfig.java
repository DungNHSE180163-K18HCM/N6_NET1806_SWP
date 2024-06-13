package com.swp391.JewelryProduction.config;

import com.google.api.client.util.Value;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;


//@Configuration
public class FirebaseConfig {
    @Value("${firebase.url}")
    private String CONFIG_PATH;

//    @Bean
    public FirebaseApp initializeFirebase() throws IOException {
        String firebaseConfigPath = System.getenv("FIREBASE_CONFIG_PATH");

        if (firebaseConfigPath == null) {
            throw new IllegalStateException("FIREBASE_CONFIG_PATH environment variable is not set.");
        }

        FileInputStream serviceAccount = new FileInputStream(CONFIG_PATH);

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        return FirebaseApp.initializeApp(options);
    }
}
