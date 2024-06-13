package com.swp391.JewelryProduction.repositories;

import com.swp391.JewelryProduction.pojos.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfo, String> {
}
