package com.swp391.JewelryProduction.dto;

import com.swp391.JewelryProduction.enums.Gender;
import com.swp391.JewelryProduction.pojos.Account;
import jakarta.persistence.Column;
import jakarta.persistence.OneToOne;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class UserInfoDTO {
    private String id;
    private String firstName;
    private String lastName;
    private LocalDate birthDate;
    private Gender gender;
    private long phoneNumber;
    private String address;
}
