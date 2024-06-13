package com.swp391.JewelryProduction.controller;

import com.swp391.JewelryProduction.dto.AccountDTO;
import com.swp391.JewelryProduction.pojos.Account;
import com.swp391.JewelryProduction.pojos.UserInfo;
import com.swp391.JewelryProduction.security.services.AuthenticationService;
import com.swp391.JewelryProduction.services.account.AccountService;
import com.swp391.JewelryProduction.util.Response;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/registration")
public class RegistrationController {
    private final static Logger logger = LoggerFactory.getLogger(RegistrationController.class);


    private final AccountService accountService;
    private final AuthenticationService authenticationService;
    private final ModelMapper modelMapper;

    @PostMapping("/register")
    public ResponseEntity<Response> register(
            @Valid @RequestBody AccountDTO accountDTO,
            BindingResult bindingResult
    ) {
        ResponseEntity<Response> errorMsg = getResponseError(bindingResult);
        if (errorMsg != null) return errorMsg;

        if (accountService.saveAccountIfNew(accountDTO) == null)
            return Response.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .message("Register account unsuccessfully.")
                    .response("Reason", "Account already exists")
                    .buildEntity();

        logger.info("OTP code: " + authenticationService.generateOTP(accountDTO.getEmail()));

        return Response.builder()
                .status(HttpStatus.OK)
                .message("Register account successfully, please verify the account")
                .buildEntity();
    }

    @PostMapping("/verify")
    public ResponseEntity<Response> confirmRegister(@RequestParam String otp, @RequestHeader("Key") String emailKey) {
        boolean isVerified = authenticationService.verifyOTP(emailKey, otp);

        String jwtToken = null;
        try {
            if (isVerified) {
                AccountDTO registerAcc = accountService.updateAccountStatusActive(emailKey);
                if (registerAcc == null) throw new Exception("Failed to verify account");
                jwtToken = authenticationService.register(registerAcc);
                logger.info(jwtToken);
            }
        } catch (Exception e) {
            return Response.builder().status(HttpStatus.BAD_REQUEST).message(e.getMessage()).buildEntity();
        }
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Verify email account successfully")
                .response("Token", jwtToken)
                .buildEntity();
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login (@Valid @RequestBody Account account, BindingResult bindingResult) {
        ResponseEntity<Response> errorMsg = getResponseError(bindingResult);
        if (errorMsg != null) return errorMsg;

        String jwtToken = authenticationService.authenticate(modelMapper.map(account, AccountDTO.class));
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Login successfully")
                .response("Token", jwtToken)
                .buildEntity();
    }

    private ResponseEntity<Response> getResponseError(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, Object> errorMsg= new HashMap<>();
            for(FieldError err: bindingResult.getFieldErrors()){
                errorMsg.put(err.getField(), err.getDefaultMessage());
            }
            return Response.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .message("Error while processing the request")
                    .responseList(errorMsg)
                    .buildEntity();
        }
        return null;
    }
}
