package com.swp391.JewelryProduction.services.account;

import com.swp391.JewelryProduction.dto.AccountDTO;
import com.swp391.JewelryProduction.enums.Role;
import com.swp391.JewelryProduction.enums.WorkStatus;
import com.swp391.JewelryProduction.pojos.Account;
import com.swp391.JewelryProduction.pojos.Staff;
import com.swp391.JewelryProduction.pojos.UserInfo;

import java.util.List;

public interface AccountService {
    List<AccountDTO> findAllAccounts();
    AccountDTO saveAccountIfNew(AccountDTO accountDTO);
    AccountDTO findAccountById(String accountId);
    AccountDTO findAccountByEmailAndPassword(String email, String password);
    void updateAccount(AccountDTO accountDTO);
    AccountDTO findAccountByEmail(String email);
    AccountDTO updateAccountStatusActive (String email);
    UserInfo findInfoById(String id);
    UserInfo findInfoByEmail(String email);
    Account findAccountByRole(Role role);
    void saveAccountPassword(AccountDTO accountDTO, String newPassword);
    Staff findStaffByRoleAndWorkStatus(Role role, WorkStatus workStatus);
}
