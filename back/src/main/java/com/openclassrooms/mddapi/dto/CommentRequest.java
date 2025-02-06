package com.openclassrooms.mddapi.dto;

import lombok.Getter;

@Getter
public class CommentRequest {
    private int userId;
    private int postId;
    private String content;
}
