package com.swp391.JewelryProduction.services.userInfo;

import com.swp391.JewelryProduction.dto.UserInfoDTO;
import com.swp391.JewelryProduction.pojos.UserInfo;
import com.swp391.JewelryProduction.repositories.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class UserInfoService implements IUserInfoService{
    private UserInfoRepository userInfoRepository;

    @Autowired
    public UserInfoService(UserInfoRepository userInfoRepository) {
        this.userInfoRepository = userInfoRepository;
    }

    @Override
    public List<UserInfoDTO> findAllUserInfos() {
//        return userInfoRepository.findAll().stream().map(userInfo -> mapToUserInfoDTO(userInfo)).collect(Collectors.toList());
        return null;
    }
}
