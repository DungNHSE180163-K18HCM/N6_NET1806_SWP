package online.be.service;

import online.be.entity.Account;
import online.be.entity.DentalClinic;
import online.be.enums.Role;
import online.be.model.EmailDetail;
import online.be.repository.AuthenticationRepository;
import online.be.repository.ClinicRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock
    private AuthenticationManager mockAuthenticationManager;
    @Mock
    private AuthenticationRepository mockAuthenticationRepository;
    @Mock
    private ClinicRepository mockClinicRepository;
    @Mock
    private PasswordEncoder mockPasswordEncoder;
    @Mock
    private TokenService mockTokenService;
    @Mock
    private EmailService mockEmailService;

    private AuthenticationService authenticationServiceUnderTest;

    @BeforeEach
    void setUp() {
        authenticationServiceUnderTest = new AuthenticationService();
        authenticationServiceUnderTest.authenticationManager = mockAuthenticationManager;
        authenticationServiceUnderTest.authenticationRepository = mockAuthenticationRepository;
        authenticationServiceUnderTest.clinicRepository = mockClinicRepository;
        authenticationServiceUnderTest.passwordEncoder = mockPasswordEncoder;
        authenticationServiceUnderTest.tokenService = mockTokenService;
        authenticationServiceUnderTest.emailService = mockEmailService;
    }

    @Test
    void testForgotPasswordRequest() {
        // Setup
        final Account account = new Account();
        account.setId(0L);
        account.setFullName("fullName");
        account.setEmail("email");
        account.setPhone("phone");
        account.setPassword("password");
        account.setRole(Role.ADMIN);

        // Mocking behavior of repository and token service
        when(mockAuthenticationRepository.findAccountByEmail("email")).thenReturn(account);
        when(mockTokenService.generateToken(any(Account.class))).thenReturn("result");

        // Run the method under test
        authenticationServiceUnderTest.forgotPasswordRequest("email");

        // Verify the email sent
        verify(mockEmailService).sendMailTemplate(any(EmailDetail.class));
    }

    @Test
    void testForgotPasswordRequest_AuthenticationRepositoryReturnsNull() {
        // Setup
        when(mockAuthenticationRepository.findAccountByEmail("email")).thenReturn(null);

        // Run the test
        assertThatThrownBy(() -> authenticationServiceUnderTest.forgotPasswordRequest("email"))
                .isInstanceOf(RuntimeException.class);
    }

    @Test
    void testForgotPasswordRequest_EmailServiceThrowsRuntimeException() {
        // Setup
        // Configure AuthenticationRepository.findAccountByEmail(...).
        final Account account = new Account();
        account.setId(0L);
        account.setFullName("fullName");
        account.setEmail("email");
        account.setPhone("phone");
        account.setPassword("password");
        account.setRole(Role.ADMIN);
        final DentalClinic dentalClinic = new DentalClinic();
        account.setDentalClinic(dentalClinic);
        when(mockAuthenticationRepository.findAccountByEmail("email")).thenReturn(account);

        when(mockTokenService.generateToken(any(Account.class))).thenReturn("result");

        // Configure EmailService.sendMailTemplate(...).
        final EmailDetail emailDetail = new EmailDetail();
        emailDetail.setRecipient("email");
        emailDetail.setMsgBody("msgBody");
        emailDetail.setSubject("subject");
        emailDetail.setFullName("fullName");
        emailDetail.setButtonValue("buttonValue");
        emailDetail.setLink("link");
        doThrow(RuntimeException.class).when(mockEmailService).sendMailTemplate(emailDetail);

        // Run the test
        assertThatThrownBy(() -> authenticationServiceUnderTest.forgotPasswordRequest("email"))
                .isInstanceOf(RuntimeException.class);
    }
}
