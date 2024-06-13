package com.swp391.JewelryProduction.services;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.swp391.JewelryProduction.dto.Blog;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class FirestoreService {
    private static final String COLLECTION_NAME = "blogs";

    public String saveBlog(Blog blog) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COLLECTION_NAME).document(blog.getId()).set(blog);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public Blog getBlog(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<com.google.cloud.firestore.DocumentSnapshot> future = documentReference.get();
        com.google.cloud.firestore.DocumentSnapshot document = future.get();

        if (document.exists()) {
            return document.toObject(Blog.class);
        } else {
            return null;
        }
    }

    public String deleteBlog(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection(COLLECTION_NAME).document(id).delete();
        return writeResult.get().getUpdateTime().toString();
    }
}
