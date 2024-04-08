package com.example.auto_vermietung_spring_angular.dto;

import com.example.auto_vermietung_spring_angular.entity.enums.Userrole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationDto {


    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Userrole userrole;
}
