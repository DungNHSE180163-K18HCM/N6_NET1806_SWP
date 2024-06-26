//package online.be.api;
//
//import online.be.config.SecurityConfig;
//import online.be.entity.Account;
//import online.be.entity.DentalClinic;
//import online.be.enums.Role;
//import online.be.model.EmailDetail;
//import online.be.model.request.*;
//import online.be.model.response.AccountResponse;
//import online.be.service.AuthenticationService;
//import online.be.service.EmailService;
//import online.be.service.TokenService;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.ArgumentCaptor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.context.annotation.Import;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.mock.web.MockHttpServletResponse;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.web.context.WebApplicationContext;
//
//import java.util.Collections;
//import java.util.List;
//import java.util.Optional;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//
//@ExtendWith(SpringExtension.class)
//@WebMvcTest(AuthenticationAPI.class)
//@Import(SecurityConfig.class) // Import your security configuration
//class AuthenticationAPITest {
//
////    @Autowired
////    private MockMvc mockMvc;
////
////    @MockBean
////    private EmailService mockEmailService;
////    @MockBean
////    private AuthenticationService mockAuthenticationService;
////    @MockBean
////    private TokenService tokenService;
////
////    @Autowired
////    private WebApplicationContext context;
////
////    @Test
////    @WithMockUser // Simulate an authenticated user
////    void testRegister1() throws Exception {
////        // Setup
////        final Account account = new Account();
////        account.setId(0L);
////        account.setFullName("fullName");
////        account.setEmail("email");
////        account.setPhone("phone");
////        account.setPassword("password");
////        account.setRole(Role.CUSTOMER);
////        when(mockAuthenticationService.register(
////                new RegisterRequest("phone", "password", "fullName", "email"))).thenReturn(account);
////
////        // Expected response JSON
////        String expectedResponse = "{\"id\":0,\"fullName\":\"fullName\",\"email\":\"email\",\"phone\":\"phone\",\"password\":\"password\",\"role\":\"CUSTOMER\"}";
////
////        // Run the test
////        final MockHttpServletResponse response = mockMvc.perform(post("/api/register")
////                        .content("{\"phone\":\"phone\", \"password\":\"password\", \"fullName\":\"fullName\", \"email\":\"email\"}")
////                        .contentType(MediaType.APPLICATION_JSON)
////                        .accept(MediaType.APPLICATION_JSON))
////                .andReturn().getResponse();
////
////        // Verify the results
////        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
////        assertThat(response.getContentAsString()).isEqualTo(expectedResponse);
////    }
////
////    @Test
////    @WithMockUser // Simulate an authenticated user
////    void testRegister2() throws Exception {
////        // Setup
////        final Account account = new Account();
////        account.setId(0L);
////        account.setFullName("fullName");
////        account.setEmail("email");
////        account.setPhone("phone");
////        account.setPassword("password");
////        account.setRole(Role.ADMIN);
////        final AdminRegisterRequest adminRegisterRequest = new AdminRegisterRequest();
////        adminRegisterRequest.setPhone("phone");
////        adminRegisterRequest.setPassword("password");
////        adminRegisterRequest.setFullName("fullName");
////        adminRegisterRequest.setEmail("email");
////        adminRegisterRequest.setRole(Role.ADMIN);
////        when(mockAuthenticationService.registerAdmin(adminRegisterRequest)).thenReturn(account);
////
////        // Expected response JSON
////        String expectedResponse = "{\"id\":0,\"fullName\":\"fullName\",\"email\":\"email\",\"phone\":\"phone\",\"password\":\"password\",\"role\":\"ADMIN\"}";
////
////        // Run the test
////        final MockHttpServletResponse response = mockMvc.perform(post("/api/register-by-admin")
////                        .content("{\"phone\":\"phone\", \"password\":\"password\", \"fullName\":\"fullName\", \"email\":\"email\", \"role\":\"ADMIN\"}")
////                        .contentType(MediaType.APPLICATION_JSON)
////                        .accept(MediaType.APPLICATION_JSON))
////                .andReturn().getResponse();
////
////        // Verify the results
////        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
////        assertThat(response.getContentAsString()).isEqualTo(expectedResponse);
////    }
////
////    @Test
////    @WithMockUser // Simulate an authenticated user
////    void testLogin() throws Exception {
////        // Setup
////        final AccountResponse accountResponse = new AccountResponse();
////        accountResponse.setToken("token");
////        when(mockAuthenticationService.login(new LoginRequest("email", "password"))).thenReturn(accountResponse);
////
////        // Expected response JSON
////        String expectedResponse = "{\"token\":\"token\"}";
////
////        // Run the test
////        final MockHttpServletResponse response = mockMvc.perform(post("/api/login")
////                        .content("{\"email\":\"email\", \"password\":\"password\"}")
////                        .contentType(MediaType.APPLICATION_JSON)
////                        .accept(MediaType.APPLICATION_JSON))
////                .andReturn().getResponse();
////
////        // Verify the results
////        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
////        assertThat(response.getContentAsString()).isEqualTo(expectedResponse);
////    }
////
////    @Test
////    @WithMockUser // Simulate an authenticated user
////    void testLoginGoogle() throws Exception {
////        // Setup
////        final AccountResponse accountResponse = new AccountResponse();
////        accountResponse.setToken("token");
////        when(mockAuthenticationService.loginGoogle(any(LoginGoogleRequest.class))).thenReturn(accountResponse);
////
////        // Expected response JSON
////        String expectedResponse = "{\"token\":\"token\"}";
////
////        // Run the test
////        final MockHttpServletResponse response = mockMvc.perform(post("/api/login-google")
////                        .content("{\"googleToken\":\"googleToken\"}")
////                        .contentType(MediaType.APPLICATION_JSON)
////                        .accept(MediaType.APPLICATION_JSON))
////                .andReturn().getResponse();
////
////        // Verify the results
////        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
////        assertThat(response.getContentAsString()).isEqualTo(expectedResponse);
////    }
////
////    @Test
////    @WithMockUser // Simulate an authenticated user
////    void testForgotPassword() throws Exception {
////        // Setup
////        // Expected response JSON
////        String expectedResponse = "{\"message\":\"Password reset link sent to email\"}";
////
////        // Run the test
////        final MockHttpServletResponse response = mockMvc.perform(post("/api/forgot-password")
////                        .content("{\"email\":\"email\"}")
////                        .contentType(MediaType.APPLICATION_JSON)
////                        .accept(MediaType.APPLICATION_JSON))
////                .andReturn().getResponse();
////
////        // Verify the results
////        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
//////        assertThat(response.getContentAsString()).isEqualTo(expectedResponse);
////        verify(mockAuthenticationService).forgotPasswordRequest("email");
////    }
////
////    @Test
////    @WithMockUser // Simulate an authenticated user
////    void testResetPassword() throws Exception {
////        // Setup
////        // Expected response JSON
////        String expectedResponse = "{\"message\":\"Password reset successfully\"}";
////
////        // Run the test
////        final MockHttpServletResponse response = mockMvc.perform(patch("/api/reset-password")
////                        .content("{\"password\":\"newPassword\"}")
////                        .contentType(MediaType.APPLICATION_JSON)
////                        .accept(MediaType.APPLICATION_JSON))
////                .andReturn().getResponse();
////
////        // Verify the results
////        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
////        assertThat(response.getContentAsString()).isEqualTo(expectedResponse);
////
////        // Confirm AuthenticationService.resetPassword(...).
////        final ResetPasswordRequest resetPasswordRequest = new ResetPasswordRequest();
////        resetPasswordRequest.setPassword("newPassword");
////        verify(mockAuthenticationService).resetPassword(resetPasswordRequest);
////    }
////
////    @Test
////    @WithMockUser // Simulate an authenticated user
////    void testGetAllAccount() throws Exception {
////        // Setup
////        final Account account = new Account();
////        account.setId(0L);
////        account.setFullName("fullName");
////        account.setEmail("email");
////        account.setPhone("phone");
////        account.setPassword("password");
////        account.setRole(Role.CUSTOMER);
////        final List<Account> accounts = List.of(account);
////        when(mockAuthenticationService.getAllAccount()).thenReturn(accounts);
////
////        // Expected response JSON
////        String expectedResponse = "[{\"id\":0,\"fullName\":\"fullName\",\"email\":\"email\",\"phone\":\"phone\",\"password\":\"password\",\"role\":\"CUSTOMER\"}]";
////
////        // Run the test
////        final MockHttpServletResponse response = mockMvc.perform(get("/api/account")
////                        .accept(MediaType.APPLICATION_JSON))
////                .andReturn().getResponse();
////
////        // Verify the results
////        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
////        assertThat(response.getContentAsString()).isEqualTo(expectedResponse);
////    }
////
////    @Test
////    @WithMockUser // Simulate an authenticated user
////    void testGetAllAccount_AuthenticationServiceReturnsNoItems() throws Exception {
////        // Setup
////        when(mockAuthenticationService.getAllAccount()).thenReturn(Collections.emptyList());
////
////        // Expected response JSON
////        String expectedResponse = "[]";
////
////        // Run the test
////        final MockHttpServletResponse response = mockMvc.perform(get("/api/account")
////                        .accept(MediaType.APPLICATION_JSON))
////                .andReturn().getResponse();
////
////        // Verify the results
////        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
////        assertThat(response.getContentAsString()).isEqualTo(expectedResponse);
////    }
////
////    @Test
////    void testRegister() {
////        // Setup
////        final RegisterRequest registerRequest = new RegisterRequest("phone", "password", "fullName", "email");
////        when(mockPasswordEncoder.encode("password")).thenReturn("password");
////
////        // Configure AuthenticationRepository.save(...).
////        final Account account = new Account();
////        account.setId(0L);
////        account.setFullName("fullName");
////        account.setEmail("email");
////        account.setPhone("phone");
////        account.setPassword("password");
////        account.setRole(Role.ADMIN);
////        final DentalClinic dentalClinic = new DentalClinic();
////        account.setDentalClinic(dentalClinic);
////        when(mockAuthenticationRepository.save(any(Account.class))).thenReturn(account);
////
////        // Run the test
////        final Account result = authenticationServiceUnderTest.register(registerRequest);
////
////        // Capture the EmailDetail argument
////        ArgumentCaptor<EmailDetail> emailDetailCaptor = ArgumentCaptor.forClass(EmailDetail.class);
////        verify(mockEmailService).sendMailTemplate(emailDetailCaptor.capture());
////
////        // Verify the captured EmailDetail
////        EmailDetail capturedEmailDetail = emailDetailCaptor.getValue();
////        assertThat(capturedEmailDetail.getRecipient()).isEqualTo("email");
////        assertThat(capturedEmailDetail.getMsgBody()).isEqualTo("aaa");
////        assertThat(capturedEmailDetail.getSubject()).isEqualTo("You are invited to system!");
////        assertThat(capturedEmailDetail.getFullName()).isEqualTo("fullName");
////        assertThat(capturedEmailDetail.getButtonValue()).isEqualTo("Login to system");
////        assertThat(capturedEmailDetail.getLink()).isEqualTo("http://dentcare.website/login");
////    }
////
////    @Test
////    void testRegisterAdmin() {
////        // Setup
////        final AdminRegisterRequest adminRegisterRequest = new AdminRegisterRequest();
////        adminRegisterRequest.setPhone("phone");
////        adminRegisterRequest.setPassword("password");
////        adminRegisterRequest.setFullName("fullName");
////        adminRegisterRequest.setEmail("email");
////        adminRegisterRequest.setRole(Role.ADMIN);
////        adminRegisterRequest.setClinicId(0L);
////
////        when(mockPasswordEncoder.encode("password")).thenReturn("password");
////
////        // Configure ClinicRepository.findById(...).
////        final DentalClinic dentalClinic1 = new DentalClinic();
////        dentalClinic1.setId(0L);
////        dentalClinic1.setClinicName("clinicName");
////        dentalClinic1.setAddress("address");
////        dentalClinic1.setOpenHours("openHours");
////        dentalClinic1.setCloseHours("closeHours");
////        final Optional<DentalClinic> dentalClinic = Optional.of(dentalClinic1);
////
////        // Configure AuthenticationRepository.save(...).
////        final Account account = new Account();
////        account.setId(0L);
////        account.setFullName("fullName");
////        account.setEmail("email");
////        account.setPhone("phone");
////        account.setPassword("password");
////        account.setRole(Role.ADMIN);
////        final DentalClinic dentalClinic2 = new DentalClinic();
////        account.setDentalClinic(dentalClinic2);
////        when(mockAuthenticationRepository.save(any(Account.class))).thenReturn(account);
////
////        // Run the test
////        final Account result = authenticationServiceUnderTest.registerAdmin(adminRegisterRequest);
////
////        // Verify the results
////        // Confirm EmailService.sendMailTemplate(...).
////        final EmailDetail emailDetail = new EmailDetail();
////        emailDetail.setRecipient("email");
////        emailDetail.setMsgBody("msgBody");
////        emailDetail.setSubject("subject");
////        emailDetail.setFullName("fullName");
////        emailDetail.setButtonValue("buttonValue");
////        emailDetail.setLink("link");
////        ArgumentCaptor<EmailDetail> emailDetailCaptor = ArgumentCaptor.forClass(EmailDetail.class);
////        verify(mockEmailService).sendMailTemplate(emailDetailCaptor.capture());
////
////        EmailDetail capturedEmailDetail = emailDetailCaptor.getValue();
////        assertThat(capturedEmailDetail.getRecipient()).isEqualTo("email");
////        assertThat(capturedEmailDetail.getMsgBody()).isEqualTo("aaa");
////        assertThat(capturedEmailDetail.getSubject()).isEqualTo("You are invited to system!");
////        assertThat(capturedEmailDetail.getFullName()).isEqualTo("fullName");
////        assertThat(capturedEmailDetail.getButtonValue()).isEqualTo("Login to system");
////        assertThat(capturedEmailDetail.getLink()).isEqualTo("http://dentcare.website/login");
//    }
//}
