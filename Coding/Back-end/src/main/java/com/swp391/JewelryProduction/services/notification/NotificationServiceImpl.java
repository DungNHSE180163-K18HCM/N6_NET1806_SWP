package com.swp391.JewelryProduction.services.notification;

import com.swp391.JewelryProduction.controller.ReportController;
import com.swp391.JewelryProduction.pojos.Account;
import com.swp391.JewelryProduction.pojos.Notification;
import com.swp391.JewelryProduction.repositories.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

import java.time.Duration;
<<<<<<< Updated upstream
import java.util.List;
=======
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
>>>>>>> Stashed changes

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService {
    private final String NOTIFICATION_EVENT_NAME = "notify";

    private final NotificationRepository notificationRepository;
    private final ReportController reportController;

    //
//    private final ModelMapper modelMapper;
//    private final Flux<ServerSentEvent<Notification>> notificationFlux = Flux.push(this::generateNotifications);
//
//    private final String EVENT_NAME = "notify";
//
//    private ServerSentEvent<Notification> generateNotification(AccountDTO account, Report report, Order order) {
//        Notification newNotification = Notification.builder()
//                .account(modelMapper.map(account, Account.class))
//                .report(report)
//                .order(order)
//                .build();
//
//        return ServerSentEvent.<Notification>builder()
//                .event(EVENT_NAME)
//                .data(newNotification)
//                .build();
//    }
//
//    private void generateNotifications(FluxSink<ServerSentEvent<Notification>> sink) {
//        Flux.interval(Duration.ofSeconds(2))
//                .map(i -> generateNotification())
//                .doOnNext(serverSentEvent -> {
//                    sink.next(serverSentEvent); // Sending notifications to the global Flux via its FluxSink
//                    log.info("Sent for {}", serverSentEvent.data().getId());
//                })
//                .doFinally(signalType -> log.info("Notification flux closed")) // Logging the closure of our generator
//                .takeWhile(notification -> !sink.isCancelled()) // We generate messages until the global Flux is closed
//                .subscribe();
//    }
//
//    private <T> Flux<ServerSentEvent<Notification>> keepAlive(Duration duration, Flux<T> data, String id) {
//        Flux<ServerSentEvent<T>> heartBeat = Flux.interval(duration)
//                .map(e -> ServerSentEvent.<T>builder()
//                    .comment("keep alive for: " + id)
//                    .build()
//                )
//                .doFinally(signalType -> log.info("Heartbeat closed for id: {}", id));
//        return Flux.<ServerSentEvent<Notification>>merge(heartBeat, data);
//    }
//
//    public Flux<ServerSentEvent<Notification>> subscribe(String id) {
//        return keepAlive(Duration.ofSeconds(3),
//                notificationFlux.filter(notification ->
//                        notification.data() == null ||
//                        notification.data().getAccount().getId().equals(id)),
//                id);
//    }
    //<editor-fold desc="MVC Service methods" defaultstate="collapsed">
    @Override
<<<<<<< Updated upstream
    public void saveNotification(Notification notification) {
    notificationRepository.save(notification);
}

    @Override
    public List<Notification> findAllByReceiver_Id(String receiverId) {
        return notificationRepository.findAllByReceiver_Id(receiverId);
    }

=======
    public Notification saveNotification(Notification notification) {
        notification.setDelivered(false);
        notification.setRead(false);
        return notificationRepository.save(notification);
    }

    @Override
    public Notification getNotificationById(UUID id) {
        return notificationRepository.findById(id).orElse(null);
    }

    @Override
    public List<Notification> getAllNotificationsByReceiverNotRead(Account receiver) {
        return notificationRepository.findAllByReceiverAndDeliveredFalse(receiver);
    }

    @Override
    public List<Notification> getAllNotificationsByReceiver(Account receiver) {
        return notificationRepository.findAllByReceiver(receiver);
    }

    @Override
    public Notification updateStatusToRead(UUID id) {
        Notification notification = notificationRepository
                .findById(id)
                .orElseThrow(NullPointerException::new);
        notification.setRead(true);
        return notificationRepository.save(notification);
    }

    @Override
    public void clearAllNotifications() {
        notificationRepository.deleteAll();
    }

    @Override
    public void clearAllNotificationsByReceiver(Account receiver) {
        notificationRepository.deleteAllByReceiver(receiver);
    }
    //</editor-fold>

    //<editor-fold desc="WebFlux Service methods" defaultstate="collapsed">
    @Override
    public Flux<ServerSentEvent<List<Notification>>> subscribeNotificationStream(Account receiver) {
        if (receiver != null) {
            return Flux.interval(Duration.ofSeconds(3))
                    .publishOn(Schedulers.boundedElastic())
                    .map(sequence -> ServerSentEvent.<List<Notification>>builder()
                            .id(String.valueOf(sequence))
                            .event("notify")
                            .data(getNotifications(receiver))
                            .build()
                    );
        }
        return Flux.interval(Duration.ofSeconds(3))
                .map(sequence -> ServerSentEvent.<List<Notification>>builder()
                        .id(String.valueOf(sequence))
                        .event("notify")
                        .data(new ArrayList<>())
                        .build());
    }

    private List<Notification> getNotifications(Account receiver) {
        List<Notification> notifications = notificationRepository
                .findAllByReceiverAndDeliveredFalse(receiver);
        notifications.forEach(notification -> {
            notification.setDelivered(true);
        });
        return notificationRepository.saveAll(notifications);
    }
    //</editor-fold>
>>>>>>> Stashed changes
}
