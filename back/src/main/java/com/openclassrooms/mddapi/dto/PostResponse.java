package com.openclassrooms.mddapi.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class PostResponse {
    private int id;
    private int authorId;
    private int subjectId;
    private String title;
    private String content;
    private Date date;
}
