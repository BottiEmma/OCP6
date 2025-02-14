package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.AllSubjectsResponse;
import com.openclassrooms.mddapi.dto.SubjectResponse;
import com.openclassrooms.mddapi.model.Subject;
import com.openclassrooms.mddapi.service.SubjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/subjects")
public class SubjectController {
    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    /**
     * Tous les thèmes
     * @return
     */
    @GetMapping()
    public ResponseEntity<AllSubjectsResponse> findAll() {
        return this.subjectService.getSubjects();
    }

    /**
     * Thème à partir de son id
     * @param id
     * @return
     */
    @GetMapping("{id}")
    public ResponseEntity<SubjectResponse> getSubject(@PathVariable int id) {
        return this.subjectService.getSubject(id);
    }

    /**
     * Abonnement à un thème
     * @param userId
     * @param subjectId
     * @return
     */
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/users/{userId}/subscribe/{subjectId}")
    public ResponseEntity<?> subscribe(@PathVariable int userId, @PathVariable int subjectId) {
        this.subjectService.subscribeToSubject(userId, subjectId);
        return ResponseEntity.ok(new HashMap<String, String>() {{
            put("message", "Subscribed successfully");
        }});
    }

    /**
     * Désabonnement à un thème
     * @param userId
     * @param subjectId
     * @return
     */
    @PutMapping("/users/{userId}/unsubscribe/{subjectId}")
    public ResponseEntity<?> unsubscribe(@PathVariable int userId, @PathVariable int subjectId) {
        this.subjectService.unsubscribeFromSubject(userId, subjectId);
        return ResponseEntity.ok(new HashMap<String, String>() {{
            put("message", "Unsubscribed successfully");
        }});
    }

    /**
     *
     * @param userId
     * @return
     */
    @GetMapping("/users/{userId}/subscriptions")
    public List<Subject> getUserSubscriptions(@PathVariable int userId) {
        return this.subjectService.getUserSubscriptions(userId);
    }

}
