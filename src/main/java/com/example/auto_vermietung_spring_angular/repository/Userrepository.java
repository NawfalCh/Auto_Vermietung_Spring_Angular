package com.example.auto_vermietung_spring_angular.repository;

import com.example.auto_vermietung_spring_angular.entity.AppUser;
import com.example.auto_vermietung_spring_angular.entity.enums.Userrole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Userrepository extends JpaRepository<AppUser,Long> {

    Optional<AppUser> findFirstByEmail(String email);

    AppUser findByUserrole(Userrole admin);
}

