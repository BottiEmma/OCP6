package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.AllCommentsResponse;
import com.openclassrooms.mddapi.dto.CommentResponse;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.CommentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    /**
     *
     * @param postId
     * @return
     */
    public ResponseEntity<AllCommentsResponse> getCommentsByPost(int postId) {
        List<Comment> comments = this.commentRepository.findByPostId(postId);
        List<CommentResponse> commentsResponses = comments.stream().map(comment -> {
            CommentResponse commentResponse = new CommentResponse();
            commentResponse.setId(comment.getId());
            commentResponse.setPostId(comment.getPost().getId());
            commentResponse.setUserId(comment.getAuthor().getId());
            commentResponse.setContent(comment.getContent());
            return commentResponse;
        }).toList();
        AllCommentsResponse allCommentsResponse = new AllCommentsResponse(commentsResponses);
        return ResponseEntity.ok(allCommentsResponse);
    }

    /**
     *
     * @param author
     * @param post
     * @param content
     * @return
     */
    public Comment createComment(User author, Post post, String content) {
        Comment comment = new Comment();
        comment.setAuthor(author);
        comment.setPost(post);
        comment.setContent(content);
        return commentRepository.save(comment);
    }

}
