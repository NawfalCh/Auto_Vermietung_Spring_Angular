package com.example.auto_vermietung_spring_angular.dto;

import com.example.auto_vermietung_spring_angular.entity.enums.BoockingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {

    private long bookingId;
    private Date fromDate;
    private Date toDate;
    private int bookingDays;
    private double price;
    private BoockingStatus status;
    private long userId;
    private long carId;
    private String userEmail;
    private String userName;
}
