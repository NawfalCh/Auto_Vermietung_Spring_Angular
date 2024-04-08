package com.example.auto_vermietung_spring_angular.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter implements Filter {



    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {

       HttpServletResponse responce = (HttpServletResponse) res;
       HttpServletRequest request = (HttpServletRequest) req;
       Map<String,String> map= new HashMap<>();
       String originHeader= request.getHeader("origin");
       responce.setHeader("Access-Control-Allow-Origin",originHeader);
       responce.setHeader("Access-Control-Allow-Methods","POST,GET,PUT,OPTIONS,DELETE");
       responce.setHeader("Access-Control-Max-Age","3600");
       responce.setHeader("Access-Control-Allow-Headers","*");

       if("OPTIONS".equalsIgnoreCase(request.getMethod())){
           responce.setStatus(HttpServletResponse.SC_OK);
       }else {
           chain.doFilter(req, res);
       }



    }
}
