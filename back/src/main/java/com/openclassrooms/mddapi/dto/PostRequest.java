package com.openclassrooms.mddapi.dto;

import lombok.Getter;

import java.util.Date;

@Getter
public class PostRequest {
    private int authorId;
    private int subjectId;
    private String title;
    private String content;
}
