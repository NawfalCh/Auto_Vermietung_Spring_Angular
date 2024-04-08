package com.example.auto_vermietung_spring_angular.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarDTO {

    private long carId;
    private String brand;
    private String model;
    private String color;
    private String year;
    private double price;
    private String transmission;
    private String fuelType;
    private byte[] image;
    private MultipartFile returnedImage;
}
