package online.be.service;

import online.be.entity.Account;
import online.be.entity.DentalClinic;
import online.be.enums.Role;
import online.be.model.EmailDetail;
import online.be.model.request.AdminRegisterRequest;
import online.be.model.request.RegisterRequest;
import online.be.repository.AuthenticationRepository;
import online.be.repository.ClinicRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
@Transactional
class DungSprint1Test {

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
        account.setEmail("valid_email@example.com");
        account.setPhone("phone");
        account.setPassword("password");
        account.setRole(Role.ADMIN);

        // Mocking behavior of repository and token service
        when(mockAuthenticationRepository.findAccountByEmail("valid_email@example.com")).thenReturn(account);
        when(mockTokenService.generateToken(any(Account.class))).thenReturn("result");

        // Run the method under test
        authenticationServiceUnderTest.forgotPasswordRequest("valid_email@example.com");

        // Verify the email sent
        verify(mockEmailService).sendMailTemplate(any(EmailDetail.class));
    }

    @Test
    void testForgotPasswordRequest_AuthenticationRepositoryReturnsNull() {
        // Setup
        when(mockAuthenticationRepository.findAccountByEmail("valid_email@example.com")).thenReturn(null);

        // Run the test
        assertThatThrownBy(() -> authenticationServiceUnderTest.forgotPasswordRequest("valid_email@example.com"))
                .isInstanceOf(RuntimeException.class);
    }

    @Test
    void testForgotPasswordRequest_EmailServiceThrowsRuntimeException() {
        // Setup
        // Configure AuthenticationRepository.findAccountByEmail(...).
        final Account account = new Account();
        account.setId(0L);
        account.setFullName("fullName");
        account.setEmail("valid_email@example.com");
        account.setPhone("phone");
        account.setPassword("password");
        account.setRole(Role.ADMIN);
        final DentalClinic dentalClinic = new DentalClinic();
        account.setDentalClinic(dentalClinic);

        when(mockAuthenticationRepository.findAccountByEmail("valid_email@example.com")).thenReturn(account);
        when(mockTokenService.generateToken(any(Account.class))).thenReturn("result");

        // Configure EmailService.sendMailTemplate(...) to throw RuntimeException.
        doThrow(RuntimeException.class).when(mockEmailService).sendMailTemplate(any(EmailDetail.class));

        // Run the test
        assertThatThrownBy(() -> authenticationServiceUnderTest.forgotPasswordRequest("valid_email@example.com"))
                .isInstanceOf(RuntimeException.class);

        // Verify the interactions
        verify(mockAuthenticationRepository).findAccountByEmail("valid_email@example.com");
        verify(mockTokenService).generateToken(account);
        verify(mockEmailService).sendMailTemplate(any(EmailDetail.class));
    }


    @Test
    void testForgetPassword_SuccessfullySendEmailRequest() {
        // Setup
        final Account account = new Account();
        account.setId(0L);
        account.setFullName("fullName");
        account.setEmail("valid_email@example.com");
        account.setPhone("phone");
        account.setPassword("password");
        account.setRole(Role.ADMIN);

        // Mocking behavior of repository and token service
        when(mockAuthenticationRepository.findAccountByEmail("valid_email@example.com")).thenReturn(account);
        when(mockTokenService.generateToken(any(Account.class))).thenReturn("result");

        // Run the method under test
        authenticationServiceUnderTest.forgotPasswordRequest("valid_email@example.com");

        // Verify the email sent
        verify(mockEmailService).sendMailTemplate(any(EmailDetail.class));
    }

    @Test
    void testForgetPassword_InvalidEmailAddress() {
        assertThatThrownBy(() -> authenticationServiceUnderTest.forgotPasswordRequest("invalid_email"))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Invalid Email Address!");
    }

    @Test
    void testForgetPassword_EmailNotFound() {
        when(mockAuthenticationRepository.findAccountByEmail("non_existent_email@example.com")).thenReturn(null);

        assertThatThrownBy(() -> authenticationServiceUnderTest.forgotPasswordRequest("non_existent_email@example.com"))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Account not found!");
    }
}
