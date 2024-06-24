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

    @Test
    void testRegister() {
        // Setup
        final RegisterRequest registerRequest = new RegisterRequest("phone", "password", "fullName", "email");
        when(mockPasswordEncoder.encode("password")).thenReturn("password");

        // Configure AuthenticationRepository.save(...).
        final Account account = new Account();
        account.setId(0L);
        account.setFullName("fullName");
        account.setEmail("email");
        account.setPhone("phone");
        account.setPassword("password");
        account.setRole(Role.ADMIN);
        final DentalClinic dentalClinic = new DentalClinic();
        account.setDentalClinic(dentalClinic);
        when(mockAuthenticationRepository.save(any(Account.class))).thenReturn(account);

        // Run the test
        final Account result = authenticationServiceUnderTest.register(registerRequest);

        // Capture the EmailDetail argument
        ArgumentCaptor<EmailDetail> emailDetailCaptor = ArgumentCaptor.forClass(EmailDetail.class);
        verify(mockEmailService).sendMailTemplate(emailDetailCaptor.capture());

        // Verify the captured EmailDetail
        EmailDetail capturedEmailDetail = emailDetailCaptor.getValue();
        assertThat(capturedEmailDetail.getRecipient()).isEqualTo("email");
        assertThat(capturedEmailDetail.getMsgBody()).isEqualTo("aaa");
        assertThat(capturedEmailDetail.getSubject()).isEqualTo("You are invited to system!");
        assertThat(capturedEmailDetail.getFullName()).isEqualTo("fullName");
        assertThat(capturedEmailDetail.getButtonValue()).isEqualTo("Login to system");
        assertThat(capturedEmailDetail.getLink()).isEqualTo("http://dentcare.website/login");
    }

    @Test
    void testRegisterAdmin() {
        // Setup
        final AdminRegisterRequest adminRegisterRequest = new AdminRegisterRequest();
        adminRegisterRequest.setPhone("phone");
        adminRegisterRequest.setPassword("password");
        adminRegisterRequest.setFullName("fullName");
        adminRegisterRequest.setEmail("email");
        adminRegisterRequest.setRole(Role.ADMIN);
        adminRegisterRequest.setClinicId(0L);

        when(mockPasswordEncoder.encode("password")).thenReturn("password");

        // Configure ClinicRepository.findById(...).
        final DentalClinic dentalClinic1 = new DentalClinic();
        dentalClinic1.setId(0L);
        dentalClinic1.setClinicName("clinicName");
        dentalClinic1.setAddress("address");
        dentalClinic1.setOpenHours("openHours");
        dentalClinic1.setCloseHours("closeHours");
        final Optional<DentalClinic> dentalClinic = Optional.of(dentalClinic1);

        // Configure AuthenticationRepository.save(...).
        final Account account = new Account();
        account.setId(0L);
        account.setFullName("fullName");
        account.setEmail("email");
        account.setPhone("phone");
        account.setPassword("password");
        account.setRole(Role.ADMIN);
        final DentalClinic dentalClinic2 = new DentalClinic();
        account.setDentalClinic(dentalClinic2);
        when(mockAuthenticationRepository.save(any(Account.class))).thenReturn(account);

        // Run the test
        final Account result = authenticationServiceUnderTest.registerAdmin(adminRegisterRequest);

        // Verify the results
        // Confirm EmailService.sendMailTemplate(...).
        final EmailDetail emailDetail = new EmailDetail();
        emailDetail.setRecipient("email");
        emailDetail.setMsgBody("msgBody");
        emailDetail.setSubject("subject");
        emailDetail.setFullName("fullName");
        emailDetail.setButtonValue("buttonValue");
        emailDetail.setLink("link");
        ArgumentCaptor<EmailDetail> emailDetailCaptor = ArgumentCaptor.forClass(EmailDetail.class);
        verify(mockEmailService).sendMailTemplate(emailDetailCaptor.capture());

        EmailDetail capturedEmailDetail = emailDetailCaptor.getValue();
        assertThat(capturedEmailDetail.getRecipient()).isEqualTo("email");
        assertThat(capturedEmailDetail.getMsgBody()).isEqualTo("aaa");
        assertThat(capturedEmailDetail.getSubject()).isEqualTo("You are invited to system!");
        assertThat(capturedEmailDetail.getFullName()).isEqualTo("fullName");
        assertThat(capturedEmailDetail.getButtonValue()).isEqualTo("Login to system");
        assertThat(capturedEmailDetail.getLink()).isEqualTo("http://dentcare.website/login");
    }
}
