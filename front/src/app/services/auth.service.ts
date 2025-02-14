import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {User} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  public user!: User;

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  login(user: User, token: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user.id.toString());
    this.user=user;
    this.isAuthenticated.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
  }


}

