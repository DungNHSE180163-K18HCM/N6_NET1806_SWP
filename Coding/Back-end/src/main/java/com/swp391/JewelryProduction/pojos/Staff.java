package com.swp391.JewelryProduction.pojos;

import com.swp391.JewelryProduction.enums.WorkStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
@DiscriminatorValue("1")
public class Staff extends Account{
    @Enumerated(EnumType.STRING)
    private WorkStatus workStatus;

    @OneToMany(
            mappedBy = "staff",
            cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.REMOVE},
            fetch = FetchType.LAZY,
            orphanRemoval = true
    )
    private List<StaffOrderHistory> history;
}
