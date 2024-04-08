package com.example.auto_vermietung_spring_angular.repository;

import com.example.auto_vermietung_spring_angular.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Carrepository extends JpaRepository<Car, Long> {

}
