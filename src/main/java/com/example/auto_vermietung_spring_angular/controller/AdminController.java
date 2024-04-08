package com.example.auto_vermietung_spring_angular.controller;

import com.example.auto_vermietung_spring_angular.dto.BookingDTO;
import com.example.auto_vermietung_spring_angular.dto.CarDTO;
import com.example.auto_vermietung_spring_angular.service.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

@PostMapping("/addcar")
    public ResponseEntity<?> addCar(@ModelAttribute CarDTO carDTO) throws IOException {
         boolean success = adminService.addCar(carDTO);

         if(success){
             return ResponseEntity.status(HttpStatus.CREATED).build();
         }else{
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
         }
    }

    @GetMapping("/allcars")
    public  ResponseEntity<?> getAllCars(){
        List<CarDTO> cars = adminService.getAllCars();

        return ResponseEntity.ok(cars);
    }

    @PostMapping("/hello")
    public String sayHello(@RequestBody String name){
    String s= "hello "+ name;
    return s;
    }


    @DeleteMapping("deletecar/{carid}")
    public ResponseEntity<?> deleteCar(@PathVariable long carid){
    adminService.deleteCar(carid);
    return ResponseEntity.ok(null);
    }

    @GetMapping("/car/{carid}")
    public ResponseEntity<CarDTO> getCar(@PathVariable long carid){

    return ResponseEntity.ok(adminService.getCarById(carid));

    }

    @PutMapping("/update/{carid}")
    public ResponseEntity<?> updateCar(@PathVariable long carid, @ModelAttribute CarDTO carDTO) throws IOException {
       try {

           boolean success = adminService.updateCar(carid,carDTO);
           if(success)
               return ResponseEntity.status(HttpStatus.OK).build();
           return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
       }catch (Exception e){
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

       }

    }


    @GetMapping("/bookings")
    public ResponseEntity<List<BookingDTO>> getUserBookings(){
        List<BookingDTO> bookins = adminService.getBookings();

        return ResponseEntity.ok(bookins);
    }


    @GetMapping("/status/{bookingid}/{status}")
    public ResponseEntity<?> changeStatus(@PathVariable long bookingid,@PathVariable String status){
    boolean success= adminService.changeBookingStatus(bookingid,status);
    if(success)
        return ResponseEntity.ok().build();
    return ResponseEntity.notFound().build();
    }


}
