package com.openclassrooms.mddapi.controller;


import com.openclassrooms.mddapi.dto.AllPostsResponse;
import com.openclassrooms.mddapi.dto.CommentRequest;
import com.openclassrooms.mddapi.dto.PostRequest;
import com.openclassrooms.mddapi.dto.PostResponse;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Subject;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.SubjectRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/posts")
public class PostController {
    private final UserRepository userRepository;
    private final PostService postService;
    private final SubjectRepository subjectRepository;
    public PostController(UserRepository userRepository, PostService postService, SubjectRepository subjectRepository) {
        this.userRepository = userRepository;
        this.postService = postService;
        this.subjectRepository = subjectRepository;
    }
    @GetMapping()
    public ResponseEntity<AllPostsResponse> findAll(Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        return this.postService.getPosts(user.getId());
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable int postId) {
        Post post = this.postService.getById(postId);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }
        return this.postService.getPost(post);
    }

    @PostMapping()
    public ResponseEntity<Post> createPost(@RequestBody PostRequest postRequest) {
        User author = userRepository.findById(postRequest.getAuthorId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        Subject subject = subjectRepository.findById(postRequest.getSubjectId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Subject not found"));


        Post savedPost = postService.createPost(author, subject, postRequest.getTitle(), postRequest.getContent());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPost);
    }
}
