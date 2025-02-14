import { Component, OnInit } from '@angular/core';
import {User} from "../interfaces/user.interface";
import {map, Observable} from "rxjs";
import {Subject} from "../interfaces/subject.interface";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {SubjectService} from "../services/subject.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User;
  subjects$!: Observable<Subject[]>;
  userSubscriptions: number[] = [];

  constructor(private userService: UserService, private authService: AuthService, private subjectService: SubjectService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.subjectService.getUserSubscriptions(this.user.id).subscribe(subscriptions => {
        this.userSubscriptions = subscriptions.map(subject => subject.id);
        this.subjects$ = this.subjectService.getUserSubscriptions(this.user.id);
      });
    });
  }

  save(): void {
    this.userService.updateUser(this.user).subscribe(updatedUser => {
      this.user = updatedUser;
      alert('Vous avez bien modifié vos informations. Vous pouvez maintenant vous reconnecter.');
      this.authService.logout();
      this.router.navigate(['/login']);
    });
  }

  unsubscribe(subjectId: number): void {
    this.subjectService.unsubscribe(this.user.id, subjectId);
    this.subjects$ = this.subjects$.pipe(
      map(subjects => subjects.filter(subject => subject.id !== subjectId))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
