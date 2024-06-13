package com.swp391.JewelryProduction.services.account;

import com.swp391.JewelryProduction.dto.AccountDTO;
import com.swp391.JewelryProduction.enums.AccountStatus;
import com.swp391.JewelryProduction.enums.Role;
import com.swp391.JewelryProduction.enums.WorkStatus;
import com.swp391.JewelryProduction.pojos.Account;
import com.swp391.JewelryProduction.pojos.Staff;
import com.swp391.JewelryProduction.pojos.UserInfo;
import com.swp391.JewelryProduction.repositories.AccountRepository;
import com.swp391.JewelryProduction.repositories.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final UserInfoRepository infoRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    //<editor-fold desc="GET METHODS" defaultstate="collapsed">
    @Override
    public List<AccountDTO> findAllAccounts() {
        return accountRepository
                .findAll()
                .stream()
                .map(account -> modelMapper.map(account, AccountDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public AccountDTO findAccountByEmail(String email) {
        return modelMapper.map(accountRepository.findByEmail(email), AccountDTO.class);
    }

    @Override
    public AccountDTO findAccountById(String accountId) {
        Account accModel = accountRepository.findById(accountId).orElse(null);
        if (accModel == null) return null;
        return modelMapper.map(accModel, AccountDTO.class);
    }

    @Override
    public AccountDTO findAccountByEmailAndPassword(String email, String password) {
        Account acc = accountRepository.findByEmail(email).orElse(null);
        if (acc == null || !passwordEncoder.matches(password, acc.getPassword()))
            return null;

        return this.modelMapper.map(acc, AccountDTO.class);
    }

    @Override
    public AccountDTO saveAccountIfNew(AccountDTO accountDTO) {
        if (accountRepository.existsByEmail(accountDTO.getEmail()))
            return null;

        accountDTO.setRole(Role.CUSTOMER);
        accountDTO.setStatus(AccountStatus.LOCKED);
        accountDTO.setDateCreated(LocalDateTime.now());
        accountDTO.setPassword(passwordEncoder.encode(accountDTO.getPassword()));
        Account accModel = modelMapper.map(accountDTO, Account.class);

        accountRepository.save(accModel);
        return accountDTO;
    }

    @Override
    public UserInfo findInfoById(String id) {
        return infoRepository.findById(id).orElse(null);
    }

    @Override
    public UserInfo findInfoByEmail(String email) {
        Account acc = accountRepository.findByEmail(email).orElse(null);
        if (acc == null) return null;
        return infoRepository.findById(acc.getId()).orElse(null);
    }

    @Override
    public Account findAccountByRole(Role role) {
        return accountRepository.findAccountByRole(role).isPresent() ?  accountRepository.findAccountByRole(role).get() : null;
    }

    @Override
    public Staff findStaffByRoleAndWorkStatus(Role role, WorkStatus workStatus) {
        return accountRepository.findStaffByRoleAndWorkStatus(role, workStatus).isPresent() ? accountRepository.findStaffByRoleAndWorkStatus(role, workStatus).get() : null;
    }
    //</editor-fold>

    //<editor-fold desc="UPDATE METHODS" defaultstate="collapsed">
    @Override
    public void updateAccount(AccountDTO accountDTO) {
        accountRepository.save(modelMapper.map(accountDTO, Account.class));
    }

    @Override
    public AccountDTO updateAccountStatusActive(String email) {
        Account acc = accountRepository.findByEmail(email).orElse(null);
        if (acc == null) return null;
        acc.setStatus(AccountStatus.ACTIVE);
        return modelMapper.map(accountRepository.save(acc), AccountDTO.class);
    }
    //</editor-fold>

    //<editor-fold desc="SAVE METHODS" defaultstate="collapsed">
    @Override
    public void saveAccountPassword(AccountDTO accountDTO, String newPassword) {
        accountDTO.setPassword(newPassword);
        accountRepository.save(modelMapper.map(accountDTO, Account.class));
    }
    //</editor-fold>
}
