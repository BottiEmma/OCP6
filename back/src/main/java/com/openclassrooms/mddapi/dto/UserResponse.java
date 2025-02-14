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

    /**
     * Réponse avec les informations de l'utilisateur
     * @param id
     * @param email
     * @param username
     */
    public UserResponse(int id, String email, String username) {
        this.id = id;
        this.email = email;
        this.username = username;
    }
}
