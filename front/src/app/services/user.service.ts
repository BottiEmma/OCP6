import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, throwError} from "rxjs";
import {User} from "../interfaces/user.interface";
import {Subject} from "../interfaces/subject.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string;
  private userId!: number;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8080';
  }

  setUserId(userId: number) {
    this.userId = userId;
  }
  getUserId(): number {
    return this.userId;
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/me`, user);
  }

  getUserSubscriptions(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/users/${this.userId}/subscriptions`);
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  public save(user: User) {
    return this.http.post<User>(this.apiUrl, user);
  }

  login(user: User): Observable<{ token: string }> {
    this.userId = user.id;
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, user);
  }

  register(user: User): Observable<{ token: string }> {
    this.userId = user.id;
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, user);
  }

  me(): Observable<User> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found!');
      return throwError(() => new Error('User is not authenticated'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    console.log('Request Headers:', headers);

    return this.http.get<User>(`${this.apiUrl}/me`, { headers });
  }
}
