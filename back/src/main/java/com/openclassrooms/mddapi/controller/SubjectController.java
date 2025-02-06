package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.AllPostsResponse;
import com.openclassrooms.mddapi.dto.AllSubjectsResponse;
import com.openclassrooms.mddapi.dto.SubjectResponse;
import com.openclassrooms.mddapi.model.Subject;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.SubjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/subjects")
public class SubjectController {
    private final SubjectService subjectService;
    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping()
    public ResponseEntity<AllSubjectsResponse> findAll() {
        return this.subjectService.getSubjects();
    }

    @GetMapping("{id}")
    public ResponseEntity<SubjectResponse> getSubject(@PathVariable int id) {
        return this.subjectService.getSubject(id);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/users/{userId}/subscribe/{subjectId}")
    public ResponseEntity<?> subscribe(@PathVariable int userId, @PathVariable int subjectId) {
        this.subjectService.subscribeToSubject(userId, subjectId);
        return ResponseEntity.ok(new HashMap<String, String>() {{
            put("message", "Subscribed successfully");
        }});
    }

    @PutMapping("/users/{userId}/unsubscribe/{subjectId}")
    public ResponseEntity<?> unsubscribe(@PathVariable int userId, @PathVariable int subjectId) {
        this.subjectService.unsubscribeFromSubject(userId, subjectId);
        return ResponseEntity.ok(new HashMap<String, String>() {{
            put("message", "Unsubscribed successfully");
        }});
    }

    @GetMapping("/users/{userId}/subscriptions")
    public List<Subject> getUserSubscriptions(@PathVariable int userId) {
        return this.subjectService.getUserSubscriptions(userId);
    }

}
