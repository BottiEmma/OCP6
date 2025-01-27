package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.model.Subject;
import com.openclassrooms.mddapi.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    public Iterable<Subject> getSubjects() {
        return subjectRepository.findAll();
    }

}