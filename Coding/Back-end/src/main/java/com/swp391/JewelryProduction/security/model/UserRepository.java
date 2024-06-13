package com.swp391.JewelryProduction.security.model;

import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface UserRepository{
    Optional<User> findByEmail(String email);
    void save(User user);
}
