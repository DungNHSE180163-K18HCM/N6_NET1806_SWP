package online.be.service;

import online.be.entity.*;
import online.be.enums.Status;
import online.be.exception.DuplicateException;
import online.be.exception.NotFoundException;
import online.be.model.request.AppointmentRequest;
import online.be.repository.AppointmentPatientRepository;
import online.be.repository.DentistServiceRepository;
import online.be.repository.PatientRepository;
import online.be.repository.SlotRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AppointmentPatientServiceTest {

    @Mock
    private AppointmentPatientRepository mockAppointmentPatientRepository;
    @Mock
    private PatientRepository mockPatientRepository;
    @Mock
    private SlotRepository mockSlotRepository;
    @Mock
    private DentistServiceRepository mockDentistServiceRepository;

    private AppointmentPatientService appointmentPatientServiceUnderTest;

    @BeforeEach
    void setUp() {
        appointmentPatientServiceUnderTest = new AppointmentPatientService();
        appointmentPatientServiceUnderTest.appointmentPatientRepository = mockAppointmentPatientRepository;
        appointmentPatientServiceUnderTest.patientRepository = mockPatientRepository;
        appointmentPatientServiceUnderTest.slotRepository = mockSlotRepository;
        appointmentPatientServiceUnderTest.dentistServiceRepository = mockDentistServiceRepository;
    }


    @Test
    void testCreateAppointment_ThrowsDuplicateException() {
        // Setup
        final AppointmentRequest appointmentRequest = new AppointmentRequest();
        appointmentRequest.setId(0L);
        appointmentRequest.setSlotId(0L);
        appointmentRequest.setPatientId(0L);
        appointmentRequest.setDentistServiceId(0L);
        appointmentRequest.setStatus(Status.ACTIVE);

        // Configure AppointmentPatientRepository.findBySlotIdAndPatientId(...).
        final AppointmentPatient appointmentPatient = new AppointmentPatient();
        appointmentPatient.setId(0L);
        final Slot slot = new Slot();
        appointmentPatient.setSlot(slot);
        final Patient patient = new Patient();
        appointmentPatient.setPatient(patient);
        final DentistServices dentistServices = new DentistServices();
        appointmentPatient.setDentistServices(dentistServices);
        appointmentPatient.setStatus(Status.ACTIVE);
        when(mockAppointmentPatientRepository.findBySlotIdAndPatientId(0L, 0L)).thenReturn(appointmentPatient);

        // Run the test
        assertThatThrownBy(() -> appointmentPatientServiceUnderTest.createAppointment(appointmentRequest))
                .isInstanceOf(DuplicateException.class);
    }

    @Test
    void testCreateAppointment_DentistServiceRepositoryReturnsNull() {
        // Setup
        final AppointmentRequest appointmentRequest = new AppointmentRequest();
        appointmentRequest.setId(0L);
        appointmentRequest.setSlotId(0L);
        appointmentRequest.setPatientId(0L);
        appointmentRequest.setDentistServiceId(0L);
        appointmentRequest.setStatus(Status.ACTIVE);

        when(mockAppointmentPatientRepository.findBySlotIdAndPatientId(0L, 0L)).thenReturn(null);

        // Configure PatientRepository.findById(...).
        final Patient patient = new Patient();
        patient.setId(0L);
        patient.setName("name");
        patient.setAge("age");
        patient.setGender(false);
        patient.setAddress("address");
        when(mockPatientRepository.findById(0L)).thenReturn(patient);

        // Configure SlotRepository.findById(...).
        final Slot slot = new Slot();
        slot.setId(0L);
        slot.setName("name");
        slot.setStartTime("startTime");
        slot.setEndTime("endTime");
        slot.setMaxPatient(0);
        when(mockSlotRepository.findById(0L)).thenReturn(slot);

        when(mockDentistServiceRepository.findById(0L)).thenReturn(null);

        // Run the test
        assertThatThrownBy(() -> appointmentPatientServiceUnderTest.createAppointment(appointmentRequest))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    void testCreateAppointment_PatientRepositoryReturnsNull() {
        // Setup
        final AppointmentRequest appointmentRequest = new AppointmentRequest();
        appointmentRequest.setId(0L);
        appointmentRequest.setSlotId(0L);
        appointmentRequest.setPatientId(0L);
        appointmentRequest.setDentistServiceId(0L);
        appointmentRequest.setStatus(Status.ACTIVE);

        when(mockAppointmentPatientRepository.findBySlotIdAndPatientId(0L, 0L)).thenReturn(null);
        when(mockPatientRepository.findById(0L)).thenReturn(null);

        // Run the test
        assertThatThrownBy(() -> appointmentPatientServiceUnderTest.createAppointment(appointmentRequest))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    void testCreateAppointment_SlotRepositoryReturnsNull() {
        // Setup
        final AppointmentRequest appointmentRequest = new AppointmentRequest();
        appointmentRequest.setId(0L);
        appointmentRequest.setSlotId(0L);
        appointmentRequest.setPatientId(0L);
        appointmentRequest.setDentistServiceId(0L);
        appointmentRequest.setStatus(Status.ACTIVE);

        when(mockAppointmentPatientRepository.findBySlotIdAndPatientId(0L, 0L)).thenReturn(null);

        // Configure PatientRepository.findById(...).
        final Patient patient = new Patient();
        patient.setId(0L);
        patient.setName("name");
        patient.setAge("age");
        patient.setGender(false);
        patient.setAddress("address");
        when(mockPatientRepository.findById(0L)).thenReturn(patient);

        when(mockSlotRepository.findById(0L)).thenReturn(null);

        // Run the test
        assertThatThrownBy(() -> appointmentPatientServiceUnderTest.createAppointment(appointmentRequest))
                .isInstanceOf(NotFoundException.class);
    }
    //test normal create appointment

    @Test
    void testCreateAppointment_AppointmentPatientRepositoryFindBySlotIdAndPatientIdReturnsNull() {
        // Setup
        final AppointmentRequest appointmentRequest = new AppointmentRequest();
        appointmentRequest.setId(0L);
        appointmentRequest.setSlotId(0L);
        appointmentRequest.setPatientId(0L);
        appointmentRequest.setDentistServiceId(0L);
        appointmentRequest.setStatus(Status.ACTIVE);

        when(mockAppointmentPatientRepository.findBySlotIdAndPatientId(0L, 0L)).thenReturn(null);

        // Configure PatientRepository.findById(...).
        final Patient patient = new Patient();
        patient.setId(0L);
        patient.setName("name");
        patient.setAge("age");
        patient.setGender(false);
        patient.setAddress("address");
        when(mockPatientRepository.findById(0L)).thenReturn(patient);

        // Configure SlotRepository.findById(...).
        final Slot slot = new Slot();
        slot.setId(0L);
        slot.setName("name");
        slot.setStartTime("startTime");
        slot.setEndTime("endTime");
        slot.setMaxPatient(0);
        when(mockSlotRepository.findById(0L)).thenReturn(slot);

        // Configure DentistServiceRepository.findById(...).
        final DentistServices dentistServices = new DentistServices();
        dentistServices.setId(0L);
        final Account account = new Account();
        account.setId(0L);
        account.setFullName("fullName");
        account.setEmail("email");
        dentistServices.setAccount(account);
        when(mockDentistServiceRepository.findById(0L)).thenReturn(dentistServices);

        // Configure AppointmentPatientRepository.save(...).
        final AppointmentPatient appointmentPatient = new AppointmentPatient();
        appointmentPatient.setId(0L);
        final Slot slot1 = new Slot();
        appointmentPatient.setSlot(slot1);
        final Patient patient1 = new Patient();
        appointmentPatient.setPatient(patient1);
        final DentistServices dentistServices1 = new DentistServices();
        appointmentPatient.setDentistServices(dentistServices1);
        appointmentPatient.setStatus(Status.ACTIVE);
        when(mockAppointmentPatientRepository.save(any(AppointmentPatient.class))).thenReturn(appointmentPatient);

        // Run the test
        final AppointmentPatient result = appointmentPatientServiceUnderTest.createAppointment(appointmentRequest);
        assertThat(result).isNotNull();

    }


//    @Test
//    void testUpdateAppointment() {
//        // Setup
//        final AppointmentRequest appointmentRequest = new AppointmentRequest();
//        appointmentRequest.setId(0L);
//        appointmentRequest.setSlotId(0L);
//        appointmentRequest.setPatientId(0L);
//        appointmentRequest.setDentistServiceId(0L);
//        appointmentRequest.setStatus(Status.ACTIVE);
//
//        // Configure AppointmentPatientRepository.findById(...).
//        final AppointmentPatient appointmentPatient = new AppointmentPatient();
//        appointmentPatient.setId(0L);
//        final Slot slot = new Slot();
//        appointmentPatient.setSlot(slot);
//        final Patient patient = new Patient();
//        appointmentPatient.setPatient(patient);
//        final DentistServices dentistServices = new DentistServices();
//        appointmentPatient.setDentistServices(dentistServices);
//        appointmentPatient.setStatus(Status.ACTIVE);
//        when(mockAppointmentPatientRepository.findById(0L)).thenReturn(appointmentPatient);
//
//        // Configure PatientRepository.findById(...).
//        final Patient patient1 = new Patient();
//        patient1.setId(0L);
//        patient1.setName("name");
//        patient1.setAge("age");
//        patient1.setGender(false);
//        patient1.setAddress("address");
//        when(mockPatientRepository.findById(0L)).thenReturn(patient1);
//
//        // Configure SlotRepository.findById(...).
//        final Slot slot1 = new Slot();
//        slot1.setId(0L);
//        slot1.setName("name");
//        slot1.setStartTime("startTime");
//        slot1.setEndTime("endTime");
//        slot1.setMaxPatient(0);
//        when(mockSlotRepository.findById(0L)).thenReturn(slot1);
//
//        // Configure DentistServiceRepository.findById(...).
//        final DentistServices dentistServices1 = new DentistServices();
//        dentistServices1.setId(0L);
//        final Account account = new Account();
//        account.setId(0L);
//        account.setFullName("fullName");
//        account.setEmail("email");
//        dentistServices1.setAccount(account);
//        when(mockDentistServiceRepository.findById(0L)).thenReturn(dentistServices1);
//
//        // Configure AppointmentPatientRepository.save(...).
//        final AppointmentPatient appointmentPatient1 = new AppointmentPatient();
//        appointmentPatient1.setId(0L);
//        final Slot slot2 = new Slot();
//        appointmentPatient1.setSlot(slot2);
//        final Patient patient2 = new Patient();
//        appointmentPatient1.setPatient(patient2);
//        final DentistServices dentistServices2 = new DentistServices();
//        appointmentPatient1.setDentistServices(dentistServices2);
//        appointmentPatient1.setStatus(Status.ACTIVE);
//        when(mockAppointmentPatientRepository.save(any(AppointmentPatient.class))).thenReturn(appointmentPatient1);
//
//        // Run the test
//        final AppointmentPatient result = appointmentPatientServiceUnderTest.updateAppointment(appointmentRequest);
//
//        // Verify the results
//    }
//
//    @Test
//    void testUpdateAppointment_AppointmentPatientRepositoryFindByIdReturnsNull() {
//        // Setup
//        final AppointmentRequest appointmentRequest = new AppointmentRequest();
//        appointmentRequest.setId(0L);
//        appointmentRequest.setSlotId(0L);
//        appointmentRequest.setPatientId(0L);
//        appointmentRequest.setDentistServiceId(0L);
//        appointmentRequest.setStatus(Status.ACTIVE);
//
//        when(mockAppointmentPatientRepository.findById(0L)).thenReturn(null);
//
//        // Run the test
//        assertThatThrownBy(() -> appointmentPatientServiceUnderTest.updateAppointment(appointmentRequest))
//                .isInstanceOf(NotFoundException.class);
//    }
//
//    @Test
//    void testDeleteAppointment() {
//        // Setup
//        final AppointmentRequest appointmentRequest = new AppointmentRequest();
//        appointmentRequest.setId(0L);
//        appointmentRequest.setSlotId(0L);
//        appointmentRequest.setPatientId(0L);
//        appointmentRequest.setDentistServiceId(0L);
//        appointmentRequest.setStatus(Status.ACTIVE);
//
//        // Configure AppointmentPatientRepository.findBySlotIdAndPatientId(...).
//        final AppointmentPatient appointmentPatient = new AppointmentPatient();
//        appointmentPatient.setId(0L);
//        final Slot slot = new Slot();
//        appointmentPatient.setSlot(slot);
//        final Patient patient = new Patient();
//        appointmentPatient.setPatient(patient);
//        final DentistServices dentistServices = new DentistServices();
//        appointmentPatient.setDentistServices(dentistServices);
//        appointmentPatient.setStatus(Status.ACTIVE);
//        when(mockAppointmentPatientRepository.findBySlotIdAndPatientId(0L, 0L)).thenReturn(appointmentPatient);
//
//        // Run the test
//        appointmentPatientServiceUnderTest.deleteAppointment(appointmentRequest);
//
//        // Verify the results
//        verify(mockAppointmentPatientRepository).save(any(AppointmentPatient.class));
//    }

//    @Test
//    void testDeleteAppointment_AppointmentPatientRepositoryFindBySlotIdAndPatientIdReturnsNull() {
//        // Setup
//        final AppointmentRequest appointmentRequest = new AppointmentRequest();
//        appointmentRequest.setId(0L);
//        appointmentRequest.setSlotId(0L);
//        appointmentRequest.setPatientId(0L);
//        appointmentRequest.setDentistServiceId(0L);
//        appointmentRequest.setStatus(Status.ACTIVE);
//
//        when(mockAppointmentPatientRepository.findBySlotIdAndPatientId(0L, 0L)).thenReturn(null);
//
//        // Run the test
//        assertThatThrownBy(() -> appointmentPatientServiceUnderTest.deleteAppointment(appointmentRequest))
//                .isInstanceOf(NotFoundException.class);
//    }
}
