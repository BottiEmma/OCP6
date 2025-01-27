package com.openclassrooms.mddapi.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "posts")
public class Post{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "date")
    private Date date;

}