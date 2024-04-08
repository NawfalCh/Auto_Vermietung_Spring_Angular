package com.example.auto_vermietung_spring_angular.service.costumer;

import com.example.auto_vermietung_spring_angular.dto.BookingDTO;
import com.example.auto_vermietung_spring_angular.dto.CarDTO;
import com.example.auto_vermietung_spring_angular.entity.AppUser;
import com.example.auto_vermietung_spring_angular.entity.Booking;
import com.example.auto_vermietung_spring_angular.entity.Car;
import com.example.auto_vermietung_spring_angular.entity.enums.BoockingStatus;
import com.example.auto_vermietung_spring_angular.repository.Bookingrepository;
import com.example.auto_vermietung_spring_angular.repository.Carrepository;
import com.example.auto_vermietung_spring_angular.repository.Userrepository;
import com.example.auto_vermietung_spring_angular.service.DTOsMapper;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class CustumerServiceImpl implements CustumerService{


    private final Carrepository carrepo;
    private final Userrepository userrepo;
    private final Bookingrepository bookingrepo;
    private final DTOsMapper dtOsMapper;

    @Override
    public List<CarDTO> getAllCars() {
        List<Car> cars = carrepo.findAll();
        return cars.stream()
                .map(c -> dtOsMapper.CarToDTO(c))
                .collect(Collectors.toList());
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
    public boolean bookingCar( BookingDTO bookingDTO) {

        Optional<AppUser> user= userrepo.findById(bookingDTO.getUserId());
        Optional<Car> car= carrepo.findById(bookingDTO.getCarId());
        if(user.isPresent() && car.isPresent()){
            Booking booking = new Booking();
            booking.setFromDate(bookingDTO.getFromDate());
            booking.setToDate(bookingDTO.getToDate());
            int days =calculateDaysDifference(bookingDTO.getFromDate(),bookingDTO.getToDate());
            booking.setBookingDays(days);
            booking.setPrice(car.get().getPrice() * days);
            booking.setStatus(BoockingStatus.PENDING);
            booking.setAppUser(user.get());
            booking.setCar(car.get());
            bookingrepo.save(booking);
            return true;

        }
        return false;
    }

    @Override
    @Transactional
    public boolean isCarAviable(long carId) {
        Optional<Booking> booking = bookingrepo.findBookingByCar_CarId(carId);
        if(booking.isPresent())
            return true;
        return false;
    }

    @Override
    @Transactional
    public List<BookingDTO> getBookings(long userId) {
        List<Booking> bookings = bookingrepo.findBookingByAppUser_Id(userId) ;
        return bookings.stream()
                .map(c -> dtOsMapper.BookingToDTO(c))
                .collect(Collectors.toList());
    }

    private int calculateDaysDifference(Date fromDate, Date toDate) {
        long differenceInMillis = toDate.getTime() - fromDate.getTime();
        // Umwandlung von Millisekunden in Tage (1 Tag = 24 * 60 * 60 * 1000 Millisekunden)
        return  (int) (differenceInMillis / (1000 * 60 * 60 * 24));

    }


}
