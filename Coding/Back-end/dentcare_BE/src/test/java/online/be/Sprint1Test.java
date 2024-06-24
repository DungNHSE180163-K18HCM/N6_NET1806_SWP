package online.be;

import com.fasterxml.jackson.databind.ObjectMapper;
import online.be.api.AuthenticationAPI;
import online.be.entity.Account;
import online.be.enums.Role;
import online.be.exception.AccountNotVerifiedException;
import online.be.model.EmailDetail;
import online.be.model.request.ForgotPasswordRequest;
import online.be.model.request.LoginRequest;
import online.be.model.request.RegisterRequest;
import online.be.model.request.ResetPasswordRequest;
import online.be.repository.AuthenticationRepository;
import online.be.service.AuthenticationService;
import online.be.service.EmailService;
import online.be.service.TokenService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(AuthenticationAPI.class)
class Sprint1Test {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @MockBean
    private AuthenticationService authenticationService;

    @MockBean
    private AuthenticationRepository authenticationRepository;

    @MockBean
    private EmailService emailService;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    void testRegister_Successful() throws Exception {
        // Setup
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setEmail("test@example.com");
        registerRequest.setFullName("Test User");
        registerRequest.setPassword("password");
        registerRequest.setPhone("1234567890");

        Account savedAccount = new Account();
        savedAccount.setId(1L);
        savedAccount.setEmail("test@example.com");
        savedAccount.setFullName("Test User");
        savedAccount.setPassword("encodedPassword");
        savedAccount.setPhone("1234567890");
        savedAccount.setRole(Role.CUSTOMER);

        when(authenticationService.register(any(RegisterRequest.class))).thenReturn(savedAccount);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");

        // Perform the request
        mockMvc.perform(post("/api/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(registerRequest)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.fullName").value("Test User"))
                .andExpect(jsonPath("$.password").value("encodedPassword"))
                .andExpect(jsonPath("$.phone").value("1234567890"))
                .andExpect(jsonPath("$.role").value("CUSTOMER"));

        // Verify the interactions
        verify(authenticationService, times(1)).register(any(RegisterRequest.class));
        verify(passwordEncoder, times(1)).encode("password");
    }


    @Test
    void testForgetPassword_Successful() throws Exception {
        // Setup
        ForgotPasswordRequest forgotPasswordRequest = new ForgotPasswordRequest();
        forgotPasswordRequest.setEmail("test@example.com");

        Account account = new Account();
        account.setEmail("test@example.com");
        account.setFullName("Test User");

        when(authenticationRepository.findAccountByEmail("test@example.com")).thenReturn(account);

        // Perform the request
        mockMvc.perform(post("/api/forgot-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(forgotPasswordRequest)))
                .andExpect(status().isOk());

        // Verify the interactions
        verify(authenticationRepository, times(1)).findAccountByEmail("test@example.com");
        verify(emailService, times(1)).sendMailTemplate(any());
    }
//
//    @Test
//    void testResetPassword_Successful() throws Exception {
//        // Setup
//        ResetPasswordRequest resetPasswordRequest = new ResetPasswordRequest();
//        resetPasswordRequest.setPassword("newPassword");
//
//        Account account = new Account();
//        account.setEmail("test@example.com");
//        account.setFullName("Test User");
//
//        when(authenticationRepository.findAccountByEmail("test@example.com")).thenReturn(account);
//
//        // Perform the request
//        mockMvc.perform(post("/api/reset-password")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(asJsonString(resetPasswordRequest)))
//                .andExpect(status().isOk());
//
//        // Verify the interactions
//        verify(authenticationRepository, times(1)).findAccountByEmail("test@example.com");
//        verify(authenticationRepository, times(1)).save(any(Account.class));
//    }

    // Utility method to convert object to JSON string
    private String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
