package com.example.auto_vermietung_spring_angular.service;

import com.example.auto_vermietung_spring_angular.dto.AuthResponceDTO;
import com.example.auto_vermietung_spring_angular.dto.LoginDTO;
import com.example.auto_vermietung_spring_angular.dto.RegistrationDto;
import com.example.auto_vermietung_spring_angular.dto.UserDto;

public interface AuthService {
     UserDto createCustumer(RegistrationDto regDto);
     boolean CheckIfCostumerExists(String email);

     AuthResponceDTO login(LoginDTO loginDTO);
}
