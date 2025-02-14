package com.openclassrooms.mddapi.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class AllCommentsResponse {
    private final List<CommentResponse> comments;

    /**
     * Réponse avec tous les commentaires
     * @param comments
     */
    public AllCommentsResponse(final List<CommentResponse> comments) {
        this.comments = comments;
    }
}
