package com.example.auto_vermietung_spring_angular.repository;

import com.example.auto_vermietung_spring_angular.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface Bookingrepository extends JpaRepository<Booking,Long> {
    Optional<Booking> findBookingByCar_CarId(long carId);
    List<Booking> findBookingByAppUser_Id(long userId);
}
