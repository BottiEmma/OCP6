package com.openclassrooms.mddapi.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;

    /**
     * Réponse avec le token
     * @param token
     */
    public LoginResponse(String token) {
        this.token = token;
    }
}