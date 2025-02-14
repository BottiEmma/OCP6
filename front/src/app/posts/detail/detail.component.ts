import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../services/post.service";
import {Post} from "../../interfaces/post.interface";
import {UserService} from "../../services/user.service";
import {SubjectService} from "../../services/subject.service";
import {CommentService} from "../../services/comment.service";
import {Comment} from "../../interfaces/comment.interface";
import {map, Observable, of, switchMap} from "rxjs";
import {User} from "../../interfaces/user.interface";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public post?: Post;
  public postId!: string;
  currentUser!: User;
  userCommentMap: Map<number, string> = new Map();
  usersMap: Map<number, string> = new Map();
  SubjectsMap: Map<number, string> = new Map();
  public comments$!: Observable<Comment[]>;
  newComment: string = '';
  private cdr: ChangeDetectorRef;

  constructor(private route: ActivatedRoute, private cdref: ChangeDetectorRef, private postService: PostService, private commentService: CommentService, private userService: UserService, private authService: AuthService, private subjectService: SubjectService){
    this.cdr = cdref;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['id'];
      this.loadPost(); // Load the post details
      this.loadComments();
    });
  }

  loadPost(): void {
    this.postService.detail(this.postId).subscribe((post: Post) => {
      this.post = post;
      if (this.post.authorId !== undefined) {
        this.userService.getUserById(this.post.authorId).subscribe(user => {
          this.usersMap.set(this.post!.authorId, user.username);
        });
      } else {
        console.error("authorId is undefined in post:", post);
      }
      this.subjectService.getSubjectById(this.post.subjectId).subscribe(subject => {
        this.SubjectsMap.set(this.post!.subjectId, subject.title);
      })
    });
  }

  loadComments(): void {
    this.comments$ = this.commentService.getComments(this.postId);
    this.comments$.subscribe(comments => {
      comments.forEach(comment => {
        if (!this.userCommentMap.has(comment.userId)) {
          this.userService.getUserById(comment.userId).subscribe(user => {
            this.userCommentMap.set(comment.userId, user.username);
            this.cdr.detectChanges();
          })
        }
      })
    })
  }

  getUsername(authorId: number): string {
    return this.usersMap.get(authorId) || '';
  }

  getCommentUsername(userId: number): string {
    return this.userCommentMap.get(userId) || '';
  }

  getSubject(subjectId: number): string {
    return <string>this.SubjectsMap.get(subjectId);
  }

  addComment(): void {
    this.userService.getCurrentUser().subscribe(user => {
      if (!user) {
        alert('Il faut être connecté pour commenter.');
        return;
      }

      this.currentUser = user;

      const comment: Comment = {
        userId: this.currentUser.id,
        postId: +this.postId,
        content: this.newComment
      };

      this.commentService.addComment(comment).pipe(
        switchMap(() => this.commentService.getComments(this.postId))
      ).subscribe(updatedComments => {
        this.comments$ = of(updatedComments);
        this.newComment = '';
        if (!this.userCommentMap.has(this.currentUser.id)) {
          this.userCommentMap.set(this.currentUser.id, this.currentUser.username);
          this.cdr.detectChanges();
        }
      });
    });
  }
}
