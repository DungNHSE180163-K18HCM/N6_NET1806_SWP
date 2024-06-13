package com.swp391.JewelryProduction.services;

import com.google.api.services.storage.Storage;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.StorageOptions;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FirebaseStorageService {
//    private static final String BUCKET_NAME = "your-bucket-name";
//
//    public String uploadFile(MultipartFile file) throws IOException {
//        Storage storage = StorageOptions.getDefaultInstance().getService();
//        Bucket bucket = storage.getBucket(BUCKET_NAME);
//
//        String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
//        Blob blob = bucket.create(fileName, file.getInputStream(), file.getContentType());
//
//        return blob.getMediaLink();
//    }
//
//    public byte[] getFile(String fileName) {
//        Storage storage = StorageOptions.getDefaultInstance().getService();
//        Bucket bucket = storage.getBucket(BUCKET_NAME);
//
//        Blob blob = bucket.get(fileName);
//        return blob.getContent();
//    }
}
