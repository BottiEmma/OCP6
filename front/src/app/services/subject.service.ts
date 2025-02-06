import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Subject} from "../interfaces/subject.interface";
import {User} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8080';
  }

  getSubjects(): Observable<Subject[]> {
    const token = localStorage.getItem('token'); // Retrieve the stored token

    if (!token) {
      console.error('No token found, user is not authenticated!');
      return new Observable(); // Return an empty observable if no token exists
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<{ subjects: Subject[] }>(`${this.apiUrl}/subjects`,  { headers }).pipe(
      map(response => response.subjects)
    );
  }

  getSubjectById(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.apiUrl}/subjects/${id}`);
  }

  subscribe(userId: number, subjectId: number) {
    const token = localStorage.getItem('token');
    console.log("JWT Token:", token); // Debugging

    if (!token) {
      console.error("No token found! Authentication required.");
      return;
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    this.http.put<{ message: string }>(`http://localhost:8080/subjects/users/${userId}/subscribe/${subjectId}`, {}, { headers })
      .subscribe({
        next: (response) => {
          console.log(response.message); // Successfully subscribed
        },
        error: (err) => {
          console.error("Subscription failed", err);
        }
      });
  }

  unsubscribe(userId: number, subjectId: number) {
    const token = localStorage.getItem('token');
    console.log("JWT Token:", token); // Debugging

    if (!token) {
      console.error("No token found! Authentication required.");
      return;
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    this.http.put<{ message: string }>(`http://localhost:8080/subjects/users/${userId}/unsubscribe/${subjectId}`, {}, { headers })
      .subscribe({
        next: (response) => {
          console.log(response.message); // Successfully subscribed
        },
        error: (err) => {
          console.error("Subscription failed", err);
        }
      });
  }

  getUserSubscriptions(userId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/subjects/users/${userId}/subscriptions`);
  }
}
