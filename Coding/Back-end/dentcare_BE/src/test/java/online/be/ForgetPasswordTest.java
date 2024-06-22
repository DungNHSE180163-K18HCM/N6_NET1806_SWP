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
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.thymeleaf.TemplateEngine;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith({SpringExtension.class, MockitoExtension.class})
@SpringBootTest
class ForgetPasswordTest {

    @MockBean
    private AuthenticationRepository mockAuthenticationRepository;

    @MockBean
    private EmailService mockEmailService;

    @MockBean
    private TokenService mockTokenService;

    @InjectMocks
    private AuthenticationService authenticationServiceUnderTest;

    @MockBean
    private TemplateEngine templateEngine;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @ParameterizedTest
    @CsvFileSource(resources = "/test_data.csv", numLinesToSkip = 1)
    void testForgotPasswordRequest(String email, Boolean result, Boolean exceptionExpected,
                                   String recipient, String msgBody, String subject,
                                   String fullName, String buttonValue, String link) {
        // Setup
        final Account account = createAccount(email);
        when(mockAuthenticationRepository.findAccountByEmail(email)).thenReturn(account);
        when(mockTokenService.generateToken(any(Account.class))).thenReturn("result");

        // Configure EmailService.sendMailTemplate(...) based on test data
        EmailDetail emailDetail = createEmailDetail(recipient, msgBody, subject, fullName, buttonValue, link);
        if (exceptionExpected) {
            doThrow(RuntimeException.class).when(mockEmailService).sendMailTemplate(emailDetail);
        }

        // Run the method under test
        if (email != null) {
            // Expecting a RuntimeException to be thrown

            Assertions.assertThrows(RuntimeException.class,
                    () -> authenticationServiceUnderTest.forgotPasswordRequest(email)
            );
        } else {
            // No exception is expected, verify method behavior
            authenticationServiceUnderTest.forgotPasswordRequest(email);
        }

        // Verify email sent only when exception is not expected
        if (!exceptionExpected && email != null) {
            verify(mockEmailService).sendMailTemplate(emailDetail);
        }
    }

    private Account createAccount(String email) {
        if (email == null) return null;
        Account account = new Account();
        account.setId(0L);
        account.setFullName("fullName");
        account.setEmail(email);
        account.setPhone("phone");
        account.setPassword("password");
        account.setRole(Role.ADMIN);
        return account;
    }

    private EmailDetail createEmailDetail(String recipient, String msgBody, String subject,
                                          String fullName, String buttonValue, String link) {
        EmailDetail emailDetail = new EmailDetail();
        emailDetail.setRecipient(recipient);
        emailDetail.setMsgBody(msgBody);
        emailDetail.setSubject(subject);
        emailDetail.setFullName(fullName);
        emailDetail.setButtonValue(buttonValue);
        emailDetail.setLink(link);
        return emailDetail;
    }
}

