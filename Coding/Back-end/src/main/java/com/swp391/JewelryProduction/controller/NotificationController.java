package com.swp391.JewelryProduction.controller;

import com.swp391.JewelryProduction.pojos.Notification;
import com.swp391.JewelryProduction.services.notification.NotificationService;
import com.swp391.JewelryProduction.util.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.swp391.JewelryProduction.pojos.Account;
import com.swp391.JewelryProduction.services.account.AccountService;
import com.swp391.JewelryProduction.services.notification.NotificationService;
import com.swp391.JewelryProduction.util.Response;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notification")
public class NotificationController {
    private final NotificationService notificationService;
    private final AccountService accountService;
    private final ModelMapper modelMapper;

    @GetMapping("/{receiverID}")
    public ResponseEntity<Response> getNotificationByReceiver (@PathVariable("receiverID") String receiverID) {
        Account receiver = modelMapper.map(accountService.findAccountById(receiverID), Account.class);
        var notificationList = notificationService.getAllNotificationsByReceiver(receiver);

        return Response.builder()
                .message("Notification get for Receiver " + receiverID)
                .responseList(IntStream
                        .rangeClosed(0, notificationList.size())
                        .boxed()
                        .collect(Collectors.toMap(i -> ++i + "", notificationList::get))
                )
                .buildEntity();
    }

    @PatchMapping("/read/{notificationID}")
    public ResponseEntity<Response> changeStatusToRead (@PathVariable("notificationID") UUID notificationID) {
        return Response.builder()
                .message("Notification change status to read")
                .response(String.valueOf(notificationID), notificationService.updateStatusToRead(notificationID))
                .buildEntity();
    }

    @GetMapping("/get-all")
    public ResponseEntity<Response> getAllNotifications(@PathVariable("accountId") String receiverId) {
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Request send successfully.")
                .response("notification-list", notificationService.findAllByReceiver_Id(receiverId))
                .buildEntity();
    }

}
