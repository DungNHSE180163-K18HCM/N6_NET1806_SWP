package online.be;

import online.be.entity.Account;
import online.be.enums.Role;
import online.be.model.EmailDetail;
import online.be.repository.AuthenticationRepository;
import online.be.service.AuthenticationService;
import online.be.service.EmailService;
import online.be.service.TokenService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.TemplateEngine;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith({SpringExtension.class, MockitoExtension.class})
@SpringBootTest
@ActiveProfiles("test")
@Transactional
class ForgetPasswordTest {

    @MockBean
    private TemplateEngine templateEngine;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AuthenticationRepository authenticationRepository;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @SpyBean
    private EmailService emailService;

    @Autowired
    private AuthenticationService authenticationServiceUnderTest;

    @Captor
    private ArgumentCaptor<EmailDetail> emailDetailArgumentCaptor;


    @BeforeEach
    void setUp() {
        authenticationServiceUnderTest = new AuthenticationService();
        authenticationServiceUnderTest.setAuthenticationManager(authenticationManager);
        authenticationServiceUnderTest.setAuthenticationRepository(authenticationRepository);
        authenticationServiceUnderTest.setPasswordEncoder(passwordEncoder);
        authenticationServiceUnderTest.setTokenService(tokenService);
        authenticationServiceUnderTest.setEmailService(emailService);
    }

    @Test
    void testForgotPasswordRequest() {
        // Setup
        final Account account = new Account();
        account.setFullName("fullName");
        account.setEmail("email");
        account.setPhone("phone");
        account.setPassword(passwordEncoder.encode("password"));
        account.setRole(Role.ADMIN);

        authenticationRepository.save(account);

        // Run the method under test
        authenticationServiceUnderTest.forgotPasswordRequest("email");

        // Verify the email sent
        verify(emailService).sendMailTemplate(emailDetailArgumentCaptor.capture());
        EmailDetail capturedEmailDetail = emailDetailArgumentCaptor.getValue();

        // Add your assertions to check the captured email details
        assert capturedEmailDetail != null;
        assertThat(capturedEmailDetail.getRecipient()).isEqualTo("email");
        assertThat(capturedEmailDetail.getFullName()).isEqualTo("fullName");
        // Add more assertions based on your email details
    }

    @Test
    void testForgotPasswordRequest_AuthenticationRepositoryReturnsNull() {
        // Run the test
        assertThatThrownBy(() -> authenticationServiceUnderTest.forgotPasswordRequest("email"))
                .isInstanceOf(RuntimeException.class);
    }

    @Test
    void testForgotPasswordRequest_EmailServiceThrowsRuntimeException() {
        // Setup
        final Account account = new Account();
        account.setFullName("fullName");
        account.setEmail("email");
        account.setPhone("phone");
        account.setPassword(passwordEncoder.encode("password"));
        account.setRole(Role.ADMIN);
        authenticationRepository.save(account);

        // Configure EmailService to throw RuntimeException
        doThrow(RuntimeException.class).when(emailService).sendMailTemplate(any(EmailDetail.class));

        // Run the test
        assertThatThrownBy(() -> authenticationServiceUnderTest.forgotPasswordRequest("email"))
                .isInstanceOf(RuntimeException.class);
    }

//    @ParameterizedTest
//    @CsvFileSource(resources = "/test_data.csv", numLinesToSkip = 1)
//    void testForgotPasswordRequest(String email, Boolean result, Boolean exceptionExpected,
//                                   String recipient, String msgBody, String subject,
//                                   String fullName, String buttonValue, String link) {
//        // Setup
//        final Account account = createAccount(email);
//        when(mockAuthenticationRepository.findAccountByEmail(email)).thenReturn(account);
//        when(mockTokenService.generateToken(any(Account.class))).thenReturn("result");
//
//        // Configure EmailService.sendMailTemplate(...) based on test data
//        EmailDetail emailDetail = createEmailDetail(recipient, msgBody, subject, fullName, buttonValue, link);
//        if (exceptionExpected) {
//            doThrow(RuntimeException.class).when(mockEmailService).sendMailTemplate(emailDetail);
//        }
//
//        // Run the method under test
//        if (email != null) {
//            // Expecting a RuntimeException to be thrown
//
//            Assertions.assertThrows(RuntimeException.class,
//                    () -> authenticationServiceUnderTest.forgotPasswordRequest(email)
//            );
//        } else {
//            // No exception is expected, verify method behavior
//            authenticationServiceUnderTest.forgotPasswordRequest(email);
//        }
//
//        // Verify email sent only when exception is not expected
//        if (!exceptionExpected && email != null) {
//            verify(mockEmailService).sendMailTemplate(emailDetail);
//        }
//    }
//
//    private Account createAccount(String email) {
//        if (email == null) return null;
//        Account account = new Account();
//        account.setId(0L);
//        account.setFullName("fullName");
//        account.setEmail(email);
//        account.setPhone("phone");
//        account.setPassword("password");
//        account.setRole(Role.ADMIN);
//        return account;
//    }
//
//    private EmailDetail createEmailDetail(String recipient, String msgBody, String subject,
//                                          String fullName, String buttonValue, String link) {
//        EmailDetail emailDetail = new EmailDetail();
//        emailDetail.setRecipient(recipient);
//        emailDetail.setMsgBody(msgBody);
//        emailDetail.setSubject(subject);
//        emailDetail.setFullName(fullName);
//        emailDetail.setButtonValue(buttonValue);
//        emailDetail.setLink(link);
//        return emailDetail;
//    }

}

