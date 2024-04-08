package com.example.auto_vermietung_spring_angular.service.admin;

import com.example.auto_vermietung_spring_angular.dto.BookingDTO;
import com.example.auto_vermietung_spring_angular.dto.CarDTO;
import com.example.auto_vermietung_spring_angular.entity.Booking;
import com.example.auto_vermietung_spring_angular.entity.Car;
import com.example.auto_vermietung_spring_angular.entity.enums.BoockingStatus;
import com.example.auto_vermietung_spring_angular.repository.Bookingrepository;
import com.example.auto_vermietung_spring_angular.repository.Carrepository;
import com.example.auto_vermietung_spring_angular.service.DTOsMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final Carrepository carrepo;
    private final DTOsMapper dtOsMapper;
    private final Bookingrepository bookingrepo;


    @Override
    public boolean addCar(CarDTO carDTO) throws IOException {

       try{
           Car car= new Car();
           car.setBrand(carDTO.getBrand());
           car.setModel(carDTO.getModel());
           car.setColor(carDTO.getColor());
           car.setYear(carDTO.getYear());
           car.setPrice(carDTO.getPrice());
           car.setTransmission(carDTO.getTransmission());
           car.setFuelType(carDTO.getFuelType());
           car.setImage(carDTO.getReturnedImage().getBytes());

           carrepo.save(car);
           return true;
       }catch (Exception e){
           return false;
       }

    }

    @Override
    public List<CarDTO> getAllCars() {

        List<Car> cars= carrepo.findAll();
        return cars.stream()
                .map(c ->dtOsMapper.CarToDTO(c))
                .collect(Collectors.toList());

    }

    @Override
    public void deleteCar(long carid) {
        carrepo.deleteById(carid);
    }

    @Override
    public CarDTO getCarById(long carid) {

        Optional<Car> foundedcar= carrepo.findById(carid);
        Car car = new Car();
        if (foundedcar.isPresent())
            car = foundedcar.get();
        return dtOsMapper.CarToDTO(car);
    }

    @Override
    public boolean updateCar(long carid, CarDTO carDTO) throws IOException {
        Optional<Car> foundedCar = carrepo.findById(carid);
        Car car = null;
        if (foundedCar.isPresent()) {
            car=foundedCar.get();
            car.setBrand(carDTO.getBrand());
            car.setModel(carDTO.getModel());
            car.setColor(carDTO.getColor());
            car.setYear(carDTO.getYear());
            car.setPrice(carDTO.getPrice());
            car.setTransmission(carDTO.getTransmission());
            car.setFuelType(carDTO.getFuelType());
            if(carDTO.getReturnedImage()!=null){
                car.setImage(carDTO.getReturnedImage().getBytes());
            }
            carrepo.save(car);
            return true;
        }

            return false;

    }

    @Override
    public List<BookingDTO> getBookings() {
        List<Booking> bookings = bookingrepo.findAll();

        return bookings.stream()
                .map(b -> dtOsMapper.BookingToDTO(b))
                .collect(Collectors.toList());
    }

    @Override
    public boolean changeBookingStatus(long bookingId, String status) {

        Optional<Booking> exist = bookingrepo.findById(bookingId);
        Booking found = null;
        if(exist.isPresent()){
            found= exist.get();
            if(status.equals("approve")){
                found.setStatus(BoockingStatus.APPROVED);
            }else if(status.equals("cancel")){
                found.setStatus(BoockingStatus.CANCELD);
            }
            bookingrepo.save(found);
            return true;
        }
        return false;
    }

}
