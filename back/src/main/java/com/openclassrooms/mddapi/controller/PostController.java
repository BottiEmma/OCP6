package com.openclassrooms.mddapi.controller;


import com.openclassrooms.mddapi.dto.AllPostsResponse;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/posts")
public class PostController {
    private final UserRepository userRepository;
    private final PostService postService;
    public PostController(UserRepository userRepository, PostService postService) {
        this.userRepository = userRepository;
        this.postService = postService;
    }
    @GetMapping()
    public ResponseEntity<AllPostsResponse> findAll(Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        return this.postService.getPosts(user.getId());
    }
}
