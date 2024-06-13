package com.swp391.JewelryProduction.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "*", maxAge = 3600)
public class AccountController {
//    private AccountServiceImpl accountService;
//
//    @Autowired
//    public AccountController(AccountServiceImpl accountService) {
//        this.accountService = accountService;
//    }
//
//    //REGISTER
//    @GetMapping
//    public String getRegister(Model model) {
//        model.addAttribute("account", new AccountDTO());
//        return "register-page";
//    }
//    @PostMapping
//    public String postRegister(@Valid @ModelAttribute("account") AccountDTO accountDTO, Model model, BindingResult bindingResult) {
//        //CHECK FORMAT
//        if (bindingResult.hasErrors()) {
//            model.addAttribute("errorMsg", "Email or password is invalid");
//            return "register-page";
//        }
//        //CHECK DATA
//        if(accountService.findAccountByEmail(accountDTO.getEmail())) {
//            model.addAttribute("errorMsg", "Email already exists");
//            return "register-page";
//        }
//        //SAVE
//        accountService.saveAccount(accountDTO);
//        return "login-page";
//    }
//
//    //LOGIN
//    @GetMapping
//    public String getLogin(Model model) {
//        model.addAttribute("account", new AccountDTO());
//        return "login-page";
//    }
//    @PostMapping
//    public String postLogin(@Valid @ModelAttribute("account") AccountDTO accountDTO, BindingResult bindingResult, Model model) {
//        //CHECK FORMAT
//        if (bindingResult.hasErrors()) {
//            model.addAttribute("errorMsg", "Email or password is invalid");
//            return "login-page";
//        }
//        //CHECK DATA
//        accountDTO = accountService.findAccountByEmailAndPassword(accountDTO.getEmail(), accountDTO.getPassword());
//        if(accountDTO == null) {
//            model.addAttribute("errorMsg", "Incorrect email or password");
//            return "login-page";
//        }
//        model.addAttribute("account", accountDTO);
//        return "home-page";
//    }
//
//    //RESET PASSWORD
//    @GetMapping
//    public String getPasswordReset(@ModelAttribute("account") AccountDTO accountDTO, Model model) {
//        model.addAttribute("account", accountDTO);
//        return "reset-password-page";
//    }
//    @PostMapping
//    public String postPasswordReset(@ModelAttribute("account") AccountDTO accountDTO, @ModelAttribute("new-password")String newPassword, Model model, BindingResult bindingResult) {
//        //CHECK FORMAT
//        if(!newPassword.matches("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")) {
//            model.addAttribute("errorMsg", "Password is invalid");
//            return "reset-password-page";
//        }
//        //CHECK DATA
//        if(accountDTO.getEmail().equals(newPassword)) {
//            model.addAttribute("errorMsg", "Password is already taken");
//            return "reset-password-page";
//        }
//        //SAVE
//        accountService.saveAccountPassword(accountDTO, newPassword);
//        return "login-page";
//    }
//
//    //FORGET PASSWORD
//    @GetMapping
//    public String getPasswordForgot(@ModelAttribute("account") AccountDTO accountDTO, Model model) {
//        model.addAttribute("account", accountDTO);
//        return "forgot-password-page";
//    }
//    @PostMapping
//    public String postPasswordForgot(@Valid @ModelAttribute("account") AccountDTO accountDTO, BindingResult bindingResult, Model model ) {
//        //CHECK FORMAT
//        if(bindingResult.hasFieldErrors("email")) {
//            model.addAttribute("errorMsg", "Email is invalid");
//        }
//        //NOT MODIFIED YET
//        //if checkOTP() is true -> return to login page
//        //else
//        return "forgot-password-page";
//    }
//
//    //LOGOUT
//    @GetMapping
//    public String getLogout() {
//        return "redirect:login-page";
//    }
}
