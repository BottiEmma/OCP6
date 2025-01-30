package com.openclassrooms.mddapi.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Subject;

import java.util.List;

@Repository
public interface SubjectRepository extends CrudRepository<Subject, Integer> {
    public Iterable<Subject> findByTitle(String name);

    @Query("SELECT s FROM Subject s JOIN s.subscribers u WHERE u.id = :userId")
    List<Subject> findSubjectsByUserId(@Param("userId") int userId);

}