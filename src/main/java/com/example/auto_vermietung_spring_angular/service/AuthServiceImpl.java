package com.example.auto_vermietung_spring_angular.service;

import com.example.auto_vermietung_spring_angular.dto.AuthResponceDTO;
import com.example.auto_vermietung_spring_angular.dto.LoginDTO;
import com.example.auto_vermietung_spring_angular.dto.RegistrationDto;
import com.example.auto_vermietung_spring_angular.dto.UserDto;
import com.example.auto_vermietung_spring_angular.entity.AppUser;
import com.example.auto_vermietung_spring_angular.entity.enums.Userrole;
import com.example.auto_vermietung_spring_angular.repository.Userrepository;
import com.example.auto_vermietung_spring_angular.utils.JWTUtil;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    @Autowired
    private  Userrepository userrepo;
    @Autowired
    private PasswordEncoder encode;
    private final JWTUtil jwtUtil;
    private final AuthenticationManager authenticationManager;


   //Methode to create Admin account
   /* @PostConstruct
    public void createAdmin(){
        AppUser admin = userrepo.findByUserrole(Userrole.Admin);
        if(admin == null){
            AppUser newAdmin = new AppUser();
            newAdmin.setFirstname("admin");
            newAdmin.setLastname("admin");
            newAdmin.setEmail("admin@email.com");
            newAdmin.setPassword(new BCryptPasswordEncoder().encode("admin123"));
            newAdmin.setUserrole(Userrole.Admin);
            userrepo.save(newAdmin);
            System.out.println("Admin created successfully");
        }
    }*/


    @Override
    public UserDto createCustumer(RegistrationDto regDto){

        AppUser costumer= new AppUser();
        costumer.setFirstname(regDto.getFirstname());
        costumer.setLastname(regDto.getLastname());
        costumer.setEmail(regDto.getEmail());
        costumer.setPassword(encode.encode(regDto.getPassword()));
        costumer.setUserrole(Userrole.Custumer);
        this.userrepo.save(costumer);

        UserDto userDto = new UserDto();
        userDto.setId(costumer.getId());
        userDto.setFirstname(costumer.getFirstname());
        userDto.setLastname(costumer.getLastname());
        userDto.setEmail(costumer.getEmail());
        return userDto;

    }

    @Override
    public boolean CheckIfCostumerExists(String email){

        return userrepo.findFirstByEmail(email).isPresent();
    }

    @Override
    public AuthResponceDTO login(LoginDTO loginDTO) {
       try{
            authenticationManager.authenticate(
                   new UsernamePasswordAuthenticationToken(
                           loginDTO.getEmail(),
                           loginDTO.getPassword()
                   )
           );
            AppUser user= userrepo.findFirstByEmail(loginDTO.getEmail()).get();

           String jwt= jwtUtil.generateToken(user);
           String refreshToken= jwtUtil.generateRefreshToken(user);
           AuthResponceDTO authResponceDTO= new AuthResponceDTO();
           authResponceDTO.setJwt(jwt);
           authResponceDTO.setRefreshJWT(refreshToken);
           authResponceDTO.setUserId(user.getId());
           authResponceDTO.setRole(user.getUserrole().name());

           return authResponceDTO;

       }catch (AuthenticationException e){
           return new AuthResponceDTO("","",00,null);

       }
    }
}
