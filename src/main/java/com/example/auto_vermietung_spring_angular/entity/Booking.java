package com.example.auto_vermietung_spring_angular.entity;

import com.example.auto_vermietung_spring_angular.entity.enums.BoockingStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "booking-car")
public class Booking{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking-id")
    private long bookingId;
    private Date fromDate;
    private Date toDate;
    private int bookingDays;
    private double price;
    @Enumerated(EnumType.STRING)
    private BoockingStatus status;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "appuser-id",referencedColumnName = "id", nullable = false)
    private AppUser appUser;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "car-id", nullable = false)
    private Car car;


}
