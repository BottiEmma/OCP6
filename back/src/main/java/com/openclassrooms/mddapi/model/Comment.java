package com.openclassrooms.mddapi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "comments")
public class Comment{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "content")
    private String content;


}