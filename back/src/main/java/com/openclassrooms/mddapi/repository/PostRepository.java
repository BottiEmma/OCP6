package com.openclassrooms.mddapi.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Post;

import java.util.List;

@Repository
public interface PostRepository extends CrudRepository<Post, Integer> {
    @Query("SELECT p FROM Post p WHERE p.subject.id IN (SELECT s.id FROM User u JOIN u.subscribedSubjects s WHERE u.id = :userId)")
    List<Post> findPostsByUserSubscriptions(@Param("userId") int userId);

}