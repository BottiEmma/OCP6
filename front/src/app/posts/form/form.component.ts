import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, Subject} from "rxjs";
import {PostService} from "../../services/post.service";
import {SubjectService} from "../../services/subject.service";
import {Post} from "../../interfaces/post.interface";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user.interface";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  postForm!: FormGroup;
  public subjects$ = this.subjectService.getSubjects();
  currentUser!: User;

  constructor(private fb: FormBuilder, private userService: UserService, private postService: PostService, private subjectService: SubjectService, private router: Router) {
    this.postForm = this.fb.group({
      subjectId: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  ngOnInit(): void {
  }
  submit() {
    if(this.postForm.valid) {
      this.userService.getCurrentUser().subscribe(user => {
        this.currentUser = user;
      const post: Post = this.postForm.value;
      post.authorId = this.currentUser.id;
      this.postService.createPost(post).subscribe({
        next: () => {
          this.router.navigate(['/posts']);
        },
        error: () => {
          console.log('Error creating post');
        }
      })
      });
    }
  }

}
