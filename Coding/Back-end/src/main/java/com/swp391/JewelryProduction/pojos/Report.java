package com.swp391.JewelryProduction.pojos;

import com.swp391.JewelryProduction.enums.ReportType;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Report {
    @Id
    @GeneratedValue
    private Integer id;
    private String title;
    private String description;
    private LocalDateTime createdDate;

    @Enumerated(EnumType.STRING)
    private ReportType type;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "sender_id")
    private Account sender;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "receiver_id")
    private Account receiver;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    private Order reportingOrder;

    @OneToOne()
    private Notification notification;
}
