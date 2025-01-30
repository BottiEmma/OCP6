package com.openclassrooms.mddapi.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserResponse {
    private int id;
    private String email;
    private String username;
    private String password;

    public UserResponse(int id, String email, String username) {
        this.id = id;
        this.email = email;
        this.username = username;
    }
}
