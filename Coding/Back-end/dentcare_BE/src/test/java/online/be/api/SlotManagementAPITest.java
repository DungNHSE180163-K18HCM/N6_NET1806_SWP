package online.be.api;

import online.be.entity.Slot;
import online.be.model.request.SlotRequest;
import online.be.model.request.SlotUpdateRequest;
import online.be.service.AuthenticationService;
import online.be.service.SlotService;
import online.be.service.TokenService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(SlotManagementAPI.class)
class SlotManagementAPITest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SlotService mockSlotService;

    @MockBean
    private TokenService mockTokenService;

    @MockBean
    private AuthenticationService authenticationService;

    @Test
    void testGetAllSlots() throws Exception {
        // Setup
        // Configure SlotService.getAllSlots(...).
        final Slot slot = new Slot();
        slot.setId(0L);
        slot.setName("name");
        slot.setStartTime("startTime");
        slot.setEndTime("endTime");
        slot.setMaxPatient(0);
        final List<Slot> slots = List.of(slot);
        when(mockSlotService.getAllSlots()).thenReturn(slots);

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(get("/api/slot")
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo("expectedResponse");
    }

    @Test
    void testGetAllSlots_SlotServiceReturnsNoItems() throws Exception {
        // Setup
        when(mockSlotService.getAllSlots()).thenReturn(Collections.emptyList());

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(get("/api/slot")
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo("expectedResponse");
    }

    @Test
    void testGetSlotByName() throws Exception {
        // Setup
        // Configure SlotService.getSlotByName(...).
        final Slot slot = new Slot();
        slot.setId(0L);
        slot.setName("name");
        slot.setStartTime("startTime");
        slot.setEndTime("endTime");
        slot.setMaxPatient(0);
        when(mockSlotService.getSlotByName("name")).thenReturn(slot);

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(get("/api/slot/search-by-name/{name}", "name")
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo("expectedResponse");
    }

    @Test
    void testGetSlotsByDentist() throws Exception {
        // Setup
        // Configure SlotService.getSlotsByDentist(...).
        final Slot slot = new Slot();
        slot.setId(0L);
        slot.setName("name");
        slot.setStartTime("startTime");
        slot.setEndTime("endTime");
        slot.setMaxPatient(0);
        final List<Slot> slots = List.of(slot);
        when(mockSlotService.getSlotsByDentist(0L)).thenReturn(slots);

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(get("/api/slot/dentists/{id}", 0)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo("expectedResponse");
    }

    @Test
    void testGetSlotsByDentist_SlotServiceReturnsNoItems() throws Exception {
        // Setup
        when(mockSlotService.getSlotsByDentist(0L)).thenReturn(Collections.emptyList());

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(get("/api/slot/dentists/{id}", 0)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo("expectedResponse");
    }

    @Test
    void testCreateSlot() throws Exception {
        // Setup
        // Configure SlotService.createSlot(...).
        final Slot slot = new Slot();
        slot.setId(0L);
        slot.setName("name");
        slot.setStartTime("startTime");
        slot.setEndTime("endTime");
        slot.setMaxPatient(0);
        when(mockSlotService.createSlot(any(SlotRequest.class))).thenReturn(slot);

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(post("/api/slot")
                        .content("content").contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo("expectedResponse");
    }

    @Test
    void testUpdateSlot() throws Exception {
        // Setup
        // Configure SlotService.updateSlot(...).
        final Slot slot = new Slot();
        slot.setId(0L);
        slot.setName("name");
        slot.setStartTime("startTime");
        slot.setEndTime("endTime");
        slot.setMaxPatient(0);
        when(mockSlotService.updateSlot(any(SlotUpdateRequest.class))).thenReturn(slot);

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(put("/api/slot")
                        .content("content").contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo("expectedResponse");
    }
}
