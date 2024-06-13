package com.swp391.JewelryProduction.services.userInfo;

import com.swp391.JewelryProduction.dto.UserInfoDTO;

import java.util.List;

public interface IUserInfoService {
    List<UserInfoDTO> findAllUserInfos();
}
