package com.swp391.JewelryProduction.services.notification;

import com.swp391.JewelryProduction.pojos.Account;
import com.swp391.JewelryProduction.pojos.Notification;
import org.springframework.http.codec.ServerSentEvent;
import reactor.core.publisher.Flux;

import java.util.List;
<<<<<<< Updated upstream

public interface NotificationService {
    void saveNotification(Notification notification);
//    Flux<ServerSentEvent<Notification>> subscribe(String accountID);
    List<Notification> findAllByReceiver_Id(String receiverId);
=======
import java.util.UUID;

public interface NotificationService {
    Notification saveNotification(Notification notification);
    Notification getNotificationById(UUID id);
    List<Notification> getAllNotificationsByReceiverNotRead(Account receiver);
    List<Notification> getAllNotificationsByReceiver(Account receiver);
    Notification updateStatusToRead (UUID id);
    void clearAllNotifications();
    void clearAllNotificationsByReceiver(Account receiver);
    Flux<ServerSentEvent<List<Notification>>> subscribeNotificationStream(Account receiver);
>>>>>>> Stashed changes
}
