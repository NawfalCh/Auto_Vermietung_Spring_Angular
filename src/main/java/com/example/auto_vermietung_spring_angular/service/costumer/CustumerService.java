package com.example.auto_vermietung_spring_angular.service.costumer;

import com.example.auto_vermietung_spring_angular.dto.BookingDTO;
import com.example.auto_vermietung_spring_angular.dto.CarDTO;

import java.util.List;

public interface CustumerService {

    public List<CarDTO> getAllCars();
    CarDTO getCarById(long carid);
    public boolean bookingCar( BookingDTO bookingDTO);
    boolean isCarAviable(long carId);
    List<BookingDTO> getBookings(long userId);

}