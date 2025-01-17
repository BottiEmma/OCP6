package com.openclassrooms.mddapi.service;

import org.springframework.stereotype.Service;

package com.openclassrooms.mddapi.repository.SubjectRepository;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    public Iterable<Subject> getSubjects() {
        return subjectRepository.findAll();
    }

}