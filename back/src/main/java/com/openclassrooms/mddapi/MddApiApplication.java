package com.openclassrooms.mddapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.openclassrooms.mddapi.service.SubjectService;

@SpringBootApplication
public class MddApiApplication {

    public static void main(String[] args) {

        SpringApplication.run(MddApiApplication.class, args);
    }

}
