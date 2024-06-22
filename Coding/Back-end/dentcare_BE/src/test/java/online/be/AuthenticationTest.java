package online.be;

import com.google.firebase.ErrorCode;
import com.google.firebase.FirebaseException;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import online.be.config.FirebaseAuthHelper;
import online.be.entity.Account;
import online.be.entity.DentalClinic;
import online.be.enums.Role;
import online.be.exception.BadRequestException;
import online.be.exception.NotFoundException;
import online.be.model.EmailDetail;
import online.be.model.request.*;
import online.be.model.response.AccountResponse;
import online.be.repository.AuthenticationRepository;
import online.be.repository.ClinicRepository;
import online.be.service.AuthenticationService;
import online.be.service.EmailService;
import online.be.service.TokenService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class AuthenticationServiceTest {
    @InjectMocks
    private AuthenticationService authenticationService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private AuthenticationRepository authenticationRepository;

    @Mock
    private ClinicRepository clinicRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private TokenService tokenService;

    @Mock
    private EmailService emailService;

    @Mock
    private FirebaseAuth firebaseAuth;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegister_SuccessfulRegistration() {
        RegisterRequest request = new RegisterRequest("email@example.com", "password", "John Doe", "123456789");


        Account account = new Account();
        account.setPhone(request.getPhone());
        account.setPassword(request.getPassword());
        account.setRole(Role.CUSTOMER);
        account.setEmail(request.getEmail());
        account.setFullName(request.getFullName());

        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(authenticationRepository.save(any(Account.class))).thenReturn(account);

        Account result = authenticationService.register(request);

        assertNotNull(result);
        assertEquals(request.getEmail(), result.getEmail());
        verify(emailService, times(1)).sendMailTemplate(any(EmailDetail.class));
    }

    @Test
        void testRegisterAdmin_SuccessfulAdminRegistration() {
        AdminRegisterRequest request = new AdminRegisterRequest();
        request.setEmail("email@example.com");
        request.setPassword("password");
        request.setFullName("John Doe");
        request.setPhone("123456789");
        request.setRole(Role.CUSTOMER);
        request.setClinicId(1L);


        Account account = new Account();
        account.setPhone(request.getPhone());
        account.setPassword(request.getPassword());
        account.setRole(request.getRole());
        account.setEmail(request.getEmail());
        account.setFullName(request.getFullName());

        DentalClinic clinic = new DentalClinic();
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(authenticationRepository.save(any(Account.class))).thenReturn(account);
        when(clinicRepository.findById(anyLong())).thenReturn(Optional.of(clinic));

        Account result = authenticationService.registerAdmin(request);

        assertNotNull(result);
        assertEquals(request.getEmail(), result.getEmail());
        verify(emailService, times(1)).sendMailTemplate(any(EmailDetail.class));
    }

    @Test
    void testRegisterAdmin_Unsuccessful_InvalidClinicId() {
        AdminRegisterRequest adminRegisterRequest = new AdminRegisterRequest();
        adminRegisterRequest.setPhone("1234567890");
        adminRegisterRequest.setPassword("password");
        adminRegisterRequest.setRole(Role.MANAGER);
        adminRegisterRequest.setEmail("admin@example.com");
        adminRegisterRequest.setFullName("Admin User");
        adminRegisterRequest.setClinicId(99L); // Assume 99L is an invalid clinic ID

        when(clinicRepository.findById(adminRegisterRequest.getClinicId()))
                .thenThrow(new NotFoundException("Cannot find this clinicId"));

        assertThrows(NotFoundException.class, () -> authenticationService.registerAdmin(adminRegisterRequest));

        verify(clinicRepository, times(1)).findById(adminRegisterRequest.getClinicId());
        verify(authenticationRepository, times(0)).save(any(Account.class));
    }

//    @Test
//    void testRegister_Unsuccessful_EmailServiceFailure() {
//        RegisterRequest registerRequest = new RegisterRequest();
//        registerRequest.setPhone("1234567890");
//        registerRequest.setPassword("password");
//        registerRequest.setEmail("user@example.com");
//        registerRequest.setFullName("Test User");
//
//        Account account = new Account();
//        account.setPhone(registerRequest.getPhone());
//        account.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
//        account.setRole(Role.CUSTOMER);
//        account.setEmail(registerRequest.getEmail());
//        account.setFullName(registerRequest.getFullName());
//
//        // Mock the email service to throw an exception
//        doThrow(new RuntimeException("Email service failure")).when(emailService).sendMailTemplate(any(EmailDetail.class));
//
//        // Mock the password encoder
//        when(passwordEncoder.encode(registerRequest.getPassword())).thenReturn("encodedPassword");
//
//        // Ensure the account save method should never be called
//        when(authenticationRepository.save(any(Account.class))).thenReturn(account);
//
//        // Verify that a RuntimeException is thrown during the registration process
//        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
//            authenticationService.register(registerRequest);
//        });
//
//        // Check the exception message
//        assertEquals("Email service failure", exception.getMessage());
//
//        // Verify the email service was called
//        verify(emailService, times(1)).sendMailTemplate(any(EmailDetail.class));
//
//        // Verify the account was not saved
//        verify(authenticationRepository, times(0)).save(any(Account.class));
//    }

//    @Test
//    void testRegisterAdmin_SuccessfulClinicStaffRegistration() {
//        AdminRegisterRequest request = new AdminRegisterRequest();
//        request.setEmail("email@example.com");
//        request.setPassword("password");
//        request.setFullName("John Doe");
//        request.setPhone("123456789");
//        request.setRole(Role.CUSTOMER);
//        request.setClinicId(1L);
//        DentalClinic clinic = new DentalClinic();
//        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
//        when(clinicRepository.findById(anyLong())).thenReturn(Optional.of(clinic));
//
//        Account result = authenticationService.registerAdmin(request);
//
//        assertNotNull(result);
//        assertEquals(request.getEmail(), result.getEmail());
//        verify(emailService, times(1)).sendMailTemplate(any(EmailDetail.class));
//    }

    @Test
    void testRegisterAdmin_ClinicNotFound() {
        AdminRegisterRequest request = new AdminRegisterRequest();
        request.setEmail("email@example.com");
        request.setPassword("password");
        request.setFullName("John Doe");
        request.setPhone("123456789");
        request.setRole(Role.CUSTOMER);
        request.setClinicId(1L);

        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(clinicRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> authenticationService.registerAdmin(request));
    }

//    @Test
//    void testLoginGoogle_SuccessfulLogin() throws FirebaseAuthException {
//        LoginGoogleRequest request = new LoginGoogleRequest();
//        request.setToken("validToken");
//        FirebaseToken firebaseToken = mock(FirebaseToken.class);
//        when(FirebaseAuth.getInstance().verifyIdToken(request.getToken())).thenReturn(firebaseToken);
//        when(firebaseToken.getEmail()).thenReturn("email@example.com");
//        when(firebaseToken.getName()).thenReturn("John Doe");
//
//        Account account = new Account();
//        account.setEmail("email@example.com");
//        account.setFullName("John Doe");
//        account.setRole(Role.CUSTOMER);
//        when(authenticationRepository.findAccountByEmail(anyString())).thenReturn(account);
//        when(authenticationRepository.save(any(Account.class))).thenReturn(account);
//        when(tokenService.generateToken(any(Account.class))).thenReturn("generatedToken");
//
//        AccountResponse result = authenticationService.loginGoogle(request);
//
//        assertNotNull(result);
//        assertEquals("email@example.com", result.getEmail());
//        verify(authenticationRepository, times(1)).findAccountByEmail(anyString());
//    }
//
//    @Test
//    void testLoginGoogle_NewUserLogin() throws FirebaseAuthException {
//        // Create the request and mock FirebaseToken
//        LoginGoogleRequest request = new LoginGoogleRequest();
//        request.setToken("validToken");
//
//        FirebaseToken firebaseToken = mock(FirebaseToken.class);
//        when(firebaseAuth.verifyIdToken(request.getToken())).thenReturn(firebaseToken);
//        when(firebaseToken.getEmail()).thenReturn("newuser@example.com");
//        when(firebaseToken.getName()).thenReturn("New User");
//
//        // Mock repository and token service behavior
//        when(authenticationRepository.findAccountByEmail(anyString())).thenReturn(null);
//
//        Account newAccount = new Account();
//        newAccount.setEmail("newuser@example.com");
//        newAccount.setFullName("New User");
//        newAccount.setRole(Role.CUSTOMER);
//
//        when(authenticationRepository.save(any(Account.class))).thenReturn(newAccount);
//        when(tokenService.generateToken(any(Account.class))).thenReturn("generatedToken");
//
//        // Execute the method under test
//        AccountResponse result = authenticationService.loginGoogle(request);
//
//        // Verify the results
//        assertNotNull(result);
//        assertEquals("newuser@example.com", result.getEmail());
//        verify(authenticationRepository, times(1)).findAccountByEmail(anyString());
//        verify(authenticationRepository, times(1)).save(any(Account.class));
//    }

//    @Test
//    void testLoginGoogle_FirebaseAuthException() throws FirebaseAuthException {
//        LoginGoogleRequest request = new LoginGoogleRequest();
//        request.setToken("validToken");
//
//        AccountResponse result = authenticationService.loginGoogle(request);
//
//        assertNull(result.getEmail());
//        verify(authenticationRepository, never()).findAccountByEmail(anyString());
//    }

    @Test
    void testLogin_SuccessfulLogin() {
        LoginRequest request = new LoginRequest("email@example.com", "password");

        Account account = new Account();
        account.setEmail(request.getEmail());
        account.setPassword("encodedPassword");
        account.setFullName("John Doe");
        account.setRole(Role.CUSTOMER);

        when(authenticationRepository.findAccountByEmail(anyString())).thenReturn(account);
        when(tokenService.generateToken(any(Account.class))).thenReturn("generatedToken");

        AccountResponse result = authenticationService.login(request);

        assertNotNull(result);
        assertEquals(request.getEmail(), result.getEmail());
        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    void testForgotPasswordRequest_AccountExists() {
        String email = "email@example.com";
        Account account = new Account();
        account.setEmail(email);
        account.setFullName("John Doe");

        when(authenticationRepository.findAccountByEmail(anyString())).thenReturn(account);
        doNothing().when(emailService).sendMailTemplate(any(EmailDetail.class));
        when(tokenService.generateToken(any(Account.class))).thenReturn("generatedToken");

        authenticationService.forgotPasswordRequest(email);

        verify(emailService, times(1)).sendMailTemplate(any(EmailDetail.class));
    }

    @Test
    void testForgotPasswordRequest_AccountNotFound() {
        String email = "nonexistent@example.com";
        when(authenticationRepository.findAccountByEmail(anyString())).thenReturn(null);

        assertThrows(RuntimeException.class, () -> authenticationService.forgotPasswordRequest(email));
    }

    @Test
    void testResetPassword_SuccessfulReset() {
        ResetPasswordRequest request = new ResetPasswordRequest();
        request.setPassword("newPassword");
        Account account = new Account();
        account.setPassword("oldPassword");

        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(new UsernamePasswordAuthenticationToken(account, null));
        SecurityContextHolder.setContext(securityContext);

        when(passwordEncoder.encode(anyString())).thenReturn("encodedNewPassword");
        when(authenticationRepository.save(any(Account.class))).thenReturn(account);

        Account result = authenticationService.resetPassword(request);

        assertNotNull(result);
        assertEquals("encodedNewPassword", result.getPassword());
    }

    @Test
    void testGetAllAccount() {
        Account account1 = new Account();
        Account account2 = new Account();
        when(authenticationRepository.findAll()).thenReturn(List.of(account1, account2));

        List<Account> result = authenticationService.getAllAccount();

        assertNotNull(result);
        assertEquals(2, result.size());
    }

//    @Test
//    void testLoadUserByUsername_UserExists() {
//        String email = "email@example.com";
//        Account account = new Account();
//        account.setEmail(email);
//
//        when(authenticationRepository.findAccountByEmail(anyString())).thenReturn(account);
//
//        UserDetails result = authenticationService.loadUserByUsername(email);
//
//        assertNotNull(result);
//        assertEquals(email, result.getUsername());
//    }

    @Test
    void testLoadUserByUsername_UserNotFound() {
        String email = "nonexistent@example.com";
        when(authenticationRepository.findAccountByEmail(anyString())).thenReturn(null);

        assertThrows(UsernameNotFoundException.class, () -> authenticationService.loadUserByUsername(email));
    }

    @Test
    void testGetCurrentAccount() {
        Account account = new Account();
        account.setEmail("email@example.com");

        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(new UsernamePasswordAuthenticationToken(account, null));
        SecurityContextHolder.setContext(securityContext);

        Account result = authenticationService.getCurrentAccount();

        assertNotNull(result);
        assertEquals("email@example.com", result.getEmail());
    }
}
