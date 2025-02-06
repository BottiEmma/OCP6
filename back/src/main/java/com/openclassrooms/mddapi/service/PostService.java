package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.AllPostsResponse;
import com.openclassrooms.mddapi.dto.PostResponse;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Subject;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.PostRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public ResponseEntity<AllPostsResponse> getPosts(int userId){
        List<Post> posts = (List<Post>) this.postRepository.findPostsByUserSubscriptions(userId);
        List<PostResponse> postsResponses = posts.stream().map(post -> {
            PostResponse postResponse = new PostResponse();
            postResponse.setId(post.getId());
            postResponse.setDate(post.getDate());
            postResponse.setTitle(post.getTitle());
            postResponse.setSubjectId(post.getSubject().getId());
            postResponse.setAuthorId(post.getAuthor().getId());
            postResponse.setContent(post.getContent());
            return postResponse;
        }).toList();
        AllPostsResponse allPostsResponse = new AllPostsResponse(postsResponses);
        return ResponseEntity.ok(allPostsResponse);
    }

    public ResponseEntity<PostResponse> getPost(Post post){
        PostResponse postResponse = new PostResponse();
        postResponse.setId(post.getId());
        postResponse.setDate(post.getDate());
        postResponse.setTitle(post.getTitle());
        postResponse.setSubjectId(post.getSubject().getId());
        postResponse.setAuthorId(post.getAuthor().getId());
        postResponse.setContent(post.getContent());
        return ResponseEntity.ok(postResponse);
    }

    public Post getById(int postId) {
        return postRepository.findById(postId).get();
    }

    public Post createPost(User author, Subject subject, String title, String content) {
        Post post = new Post();
        post.setAuthor(author);
        post.setSubject(subject);
        post.setTitle(title);
        post.setContent(content);
        post.setDate(new Date());
        return postRepository.save(post);
    }
}