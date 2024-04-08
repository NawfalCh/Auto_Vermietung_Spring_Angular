package com.example.auto_vermietung_spring_angular.dto;

import com.example.auto_vermietung_spring_angular.entity.enums.Userrole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponceDTO {
    private String jwt;
    private String refreshJWT;
    private long userId;
    private String role;

}
