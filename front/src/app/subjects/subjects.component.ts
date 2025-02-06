import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Subject} from "../interfaces/subject.interface";
import {SubjectService} from "../services/subject.service";
import {UserService} from "../services/user.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {User} from "../interfaces/user.interface";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  user!: User;
  public subjects$!: Observable<Subject[]>;
  userSubscriptions: number[] = [];

  constructor(private subjectService: SubjectService, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.subjects$ = this.subjectService.getSubjects();

    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;

      this.subjectService.getUserSubscriptions(this.user.id).subscribe(subscriptions => {
        this.userSubscriptions = subscriptions.map(subject => subject.id);
      });
    });
  }

  isSubscribed(subjectId: number): boolean {
    return this.userSubscriptions.includes(subjectId);
  }

  toggleSubscription(subjectId: number): void {
    if (this.isSubscribed(subjectId)) {
      this.subjectService.unsubscribe(this.user.id, subjectId);
      this.userSubscriptions = this.userSubscriptions.filter(id => id !== subjectId);
    } else {
      this.subjectService.subscribe(this.user.id, subjectId);
      this.userSubscriptions.push(subjectId);
    }
  }

}
