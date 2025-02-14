package com.openclassrooms.mddapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentResponse {
    private int id;
    private int userId;
    private int postId;
    private String content;
}
