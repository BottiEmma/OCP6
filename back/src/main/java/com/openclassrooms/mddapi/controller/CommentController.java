package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.AllCommentsResponse;
import com.openclassrooms.mddapi.dto.CommentRequest;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("")
public class CommentController {
    private final CommentService commentService;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public CommentController(CommentService commentService, UserRepository userRepository, PostRepository postRepository) {
        this.commentService = commentService;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    /**
     * Tous les commentaires d'un post
     * @param postId
     * @return
     */
    @GetMapping("/post/{postId}")
    public ResponseEntity<AllCommentsResponse> getComments(@PathVariable int postId) {
        return this.commentService.getCommentsByPost(postId);
    }

    /**
     * Créer un commentaire
     * @param commentRequest
     * @return
     */
    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody CommentRequest commentRequest) {
        User author = userRepository.findById(commentRequest.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        Post post = postRepository.findById(commentRequest.getPostId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));

        Comment savedComment = commentService.createComment(author, post, commentRequest.getContent());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedComment);
    }
}
