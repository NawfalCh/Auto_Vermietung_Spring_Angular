package com.example.auto_vermietung_spring_angular.controller;

import com.example.auto_vermietung_spring_angular.dto.AuthResponceDTO;
import com.example.auto_vermietung_spring_angular.dto.LoginDTO;
import com.example.auto_vermietung_spring_angular.dto.RegistrationDto;
import com.example.auto_vermietung_spring_angular.dto.UserDto;
import com.example.auto_vermietung_spring_angular.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthControl {

    @Autowired
    private AuthService authService;

    @PostMapping("/registration")
    public ResponseEntity<?> costumerRegistration(@RequestBody RegistrationDto regDto){
        if(authService.CheckIfCostumerExists(regDto.getEmail()))
            return new ResponseEntity<>("Costumer with email already exists", HttpStatus.NOT_ACCEPTABLE);

        UserDto userDto = authService.createCustumer(regDto);
        if(userDto == null)
            return new ResponseEntity<>("Costumer not created", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(userDto, HttpStatus.CREATED);

    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponceDTO> custumerLogin(@RequestBody LoginDTO loginDTO){

        return ResponseEntity.ok(authService.login(loginDTO));
    }



}
