package com.openclassrooms.mddapi.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class AllPostsResponse {
    private final List<PostResponse> posts;

    /**
     * Réponse avec tous les articles
     * @param posts
     */
    public AllPostsResponse(final List<PostResponse> posts) {
        this.posts = posts;
    }
}
