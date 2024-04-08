package com.example.auto_vermietung_spring_angular.service;

import com.example.auto_vermietung_spring_angular.dto.BookingDTO;
import com.example.auto_vermietung_spring_angular.dto.CarDTO;
import com.example.auto_vermietung_spring_angular.entity.Booking;
import com.example.auto_vermietung_spring_angular.entity.Car;
import org.springframework.stereotype.Component;

@Component
public class DTOsMapper {

    public CarDTO CarToDTO(Car car) {
        CarDTO carDTO = new CarDTO();
        carDTO.setCarId(car.getCarId());
        carDTO.setBrand(car.getBrand());
        carDTO.setModel(car.getModel());
        carDTO.setColor(car.getColor());
        carDTO.setYear(car.getYear());
        carDTO.setPrice(car.getPrice());
        carDTO.setTransmission(car.getTransmission());
        carDTO.setFuelType(car.getFuelType());
        carDTO.setImage(car.getImage());

        return carDTO;
    }

    public BookingDTO BookingToDTO(Booking booking){
        BookingDTO bookingDTO = new BookingDTO();

        bookingDTO.setBookingId(booking.getBookingId());
        bookingDTO.setFromDate(booking.getFromDate());
        bookingDTO.setToDate(booking.getToDate());
        bookingDTO.setBookingDays(booking.getBookingDays());
        bookingDTO.setPrice(booking.getPrice());
        bookingDTO.setStatus(booking.getStatus());
        bookingDTO.setCarId(booking.getCar().getCarId());
        bookingDTO.setUserId(booking.getAppUser().getId());
        bookingDTO.setUserEmail(booking.getAppUser().getEmail());
        bookingDTO.setUserName(booking.getAppUser().getFirstname());

        return bookingDTO;

    }
}
