package com.example.auto_vermietung_spring_angular.controller;


import com.example.auto_vermietung_spring_angular.dto.BookingDTO;
import com.example.auto_vermietung_spring_angular.dto.CarDTO;
import com.example.auto_vermietung_spring_angular.service.costumer.CustumerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustumerServiceImpl custumerService;



    @GetMapping("/cars")
    public ResponseEntity<?> getAllCars(){
        List<CarDTO> cars = custumerService.getAllCars();

        return ResponseEntity.ok(cars);
    }

    @GetMapping("/car/{carid}")
    public ResponseEntity<CarDTO> getCar(@PathVariable long carid){

        CarDTO car= custumerService.getCarById(carid);
        if(car==null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(car);

    }

    @PostMapping("/car/booking")
    public ResponseEntity<?> bookingCar(@RequestBody BookingDTO bookingDTO){

        boolean success = custumerService.bookingCar(bookingDTO);
        if(success)
            return ResponseEntity.status(HttpStatus.CREATED).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/car/isaviable/{carid}")
    public boolean isCarAviable (@PathVariable long carid){
        return custumerService.isCarAviable(carid);
    }

    @GetMapping("/mybookings/{userid}")
    public ResponseEntity<List<BookingDTO>> getUserBookings(@PathVariable long userid){
        List<BookingDTO> bookins = custumerService.getBookings(userid);

        return ResponseEntity.ok(bookins);
    }
}
