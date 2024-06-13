package com.swp391.JewelryProduction.pojos;

import com.swp391.JewelryProduction.enums.OrderStatus;
import com.swp391.JewelryProduction.enums.Role;
import com.swp391.JewelryProduction.pojos.designPojos.Product;
import com.swp391.JewelryProduction.util.IdGenerator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "[Order]")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_seq")
    @GenericGenerator(
            name = "order_seq",
            type = IdGenerator.class,
            parameters = {
                    @Parameter(name = IdGenerator.INCREMENT_PARAM, value = "1"),
                    @Parameter(name = IdGenerator.VALUE_PREFIX_PARAMETER, value = "ORD"),
                    @Parameter(name = IdGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d")
            }
    )
    @Column(length = 8, nullable = false, updatable = false, unique = true)
    private String id;
    private String name;
    private double budget;
    @Column(name = "date_created", nullable = false)
    private LocalDateTime createdDate;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @OneToOne
    @JoinColumn(name = "quotation_id")
    private Quotation quotation;

    @OneToOne
    @JoinColumn(name = "design_id")
    private Design design;

    @OneToMany(
            mappedBy = "order",
            cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.REMOVE},
            fetch = FetchType.LAZY
    )
    private List<StaffOrderHistory> staffOrderHistory;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Notification> notifications;

    @OneToOne(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Product product;

    @OneToMany(mappedBy = "reportingOrder", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Report> relatedReports;

    @Transient
    private Staff saleStaff;
    @Transient
    private Staff designStaff;
    @Transient
    private Staff productionStaff;

    public Staff getSaleStaff() {
        return getStaffByRole(Role.SALE_STAFF);
    }

    public Staff getDesignStaff() {
        return getStaffByRole(Role.DESIGN_STAFF);
    }

    public Staff getProductionStaff() {
        return getStaffByRole(Role.PRODUCTION_STAFF);
    }

    private Staff getStaffByRole(Role role) {
        for (StaffOrderHistory history : staffOrderHistory) {
            if (history.getStaff().getRole() == role) {
                return history.getStaff();
            }
        }
        return null;
    }

    public void setSaleStaff (Staff saleStaff) {
        this.saleStaff = saleStaff;
        staffOrderHistory.add(StaffOrderHistory.builder()
                .staff(saleStaff)
                .order(this)
                .startDate(LocalDateTime.now())
                .build()
        );
    }

    public void setDesignStaff (Staff designStaff) {
        this.designStaff = designStaff;
        staffOrderHistory.add(StaffOrderHistory.builder()
                .staff(designStaff)
                .order(this)
                .startDate(LocalDateTime.now())
                .build()
        );
    }

    public void setProductionStaff (Staff saleStaff) {
        this.saleStaff = saleStaff;
        staffOrderHistory.add(StaffOrderHistory.builder()
                .staff(saleStaff)
                .order(this)
                .startDate(LocalDateTime.now())
                .build()
        );
    }
}
