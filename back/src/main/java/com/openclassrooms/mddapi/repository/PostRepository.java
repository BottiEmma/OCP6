package com.openclassrooms.mddapi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Post;

@Repository
public interface PostRepository extends CrudRepository<Post, Integer> {

}