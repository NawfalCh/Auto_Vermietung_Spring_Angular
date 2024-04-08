package com.example.auto_vermietung_spring_angular.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "car-id")
    private long carId;
    @Column(name = "brand")
    private String brand;
    @Column(name = "model")
    private String model;
    @Column(name = "color")
    private String color;
    @Column(name = "year")
    private String year;
    @Column(name = "price")
    private double price;
    @Column(name = "transmission")
    private String transmission;
    @Column(name = "fueltype")
    private String fuelType;
    @Lob
    @Column(name = "car_image")
    private byte[] image;
}
