package com.swp391.JewleryProduction;

import com.swp391.JewelryProduction.repositories.NotificationRepository;
import com.swp391.JewelryProduction.services.notification.NotificationService;
import com.swp391.JewelryProduction.services.notification.NotificationServiceImpl;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class NotificationServiceTest {
    @InjectMocks
    NotificationServiceImpl notificationService;

    @Mock
    NotificationRepository notificationRepository;
}
