package com.example.auto_vermietung_spring_angular.service.admin;

import com.example.auto_vermietung_spring_angular.dto.BookingDTO;
import com.example.auto_vermietung_spring_angular.dto.CarDTO;

import java.io.IOException;
import java.util.List;

public interface AdminService {

    boolean addCar(CarDTO carDTO) throws IOException;
    List<CarDTO> getAllCars();
    void deleteCar(long carid);
    CarDTO getCarById(long carid);
    boolean updateCar(long carid, CarDTO carDTO) throws IOException;
    List<BookingDTO> getBookings();
    boolean changeBookingStatus(long bookingId, String status);

}
