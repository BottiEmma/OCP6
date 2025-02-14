package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.AllSubjectsResponse;
import com.openclassrooms.mddapi.dto.SubjectResponse;
import com.openclassrooms.mddapi.model.Subject;
import com.openclassrooms.mddapi.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;

import java.util.List;


@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;
    private final UserRepository userRepository;

    public SubjectService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     *
     * @return
     */
    public ResponseEntity<AllSubjectsResponse> getSubjects() {
        List<Subject> subjects = (List<Subject>) this.subjectRepository.findAll();
        List<SubjectResponse> subjectsResponses = subjects.stream().map(subject -> {
            SubjectResponse subjectResponse = new SubjectResponse();
            subjectResponse.setId(subject.getId());
            subjectResponse.setDescription(subject.getDescription());
            subjectResponse.setTitle(subject.getTitle());
            return subjectResponse;
        }).toList();
        AllSubjectsResponse allSubjectsResponse = new AllSubjectsResponse(subjectsResponses);
        return ResponseEntity.ok(allSubjectsResponse);
    }

    /**
     *
     * @param id
     * @return
     */
    public ResponseEntity<SubjectResponse> getSubject(Integer id) {
        Subject subject = this.subjectRepository.findById(id).orElse(null);
        SubjectResponse subjectResponse = new SubjectResponse();
        subjectResponse.setId(subject.getId());
        subjectResponse.setDescription(subject.getDescription());
        subjectResponse.setTitle(subject.getTitle());
        return ResponseEntity.ok(subjectResponse);
    }

    /**
     *
     * @param userId
     * @param subjectId
     */
    public void subscribeToSubject(int userId, int subjectId) {
        User user = userRepository.findById(userId).orElseThrow();
        Subject subject = subjectRepository.findById(subjectId).orElseThrow();
        user.getSubscribedSubjects().add(subject);
        userRepository.save(user);
    }

    /**
     *
     * @param userId
     * @param subjectId
     */
    public void unsubscribeFromSubject(int userId, int subjectId) {
        User user = userRepository.findById(userId).orElseThrow();
        Subject subject = subjectRepository.findById(subjectId).orElseThrow();
        user.getSubscribedSubjects().remove(subject);
        userRepository.save(user);
    }

    /**
     *
     * @param userId
     * @return
     */
    public List<Subject> getUserSubscriptions(int userId) {
        return this.subjectRepository.findSubjectsByUserId(userId);
    }
}