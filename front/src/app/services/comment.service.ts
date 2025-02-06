import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Comment} from "../interfaces/comment.interface";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getComments(postId: String): Observable<Comment[]> {
    const token = localStorage.getItem('token'); // Retrieve the stored token

    if (!token) {
      console.error('No token found, user is not authenticated!');
      return new Observable(); // Return an empty observable if no token exists
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<{ comments: Comment[] }>(`${this.apiUrl}/post/${postId}`,  { headers }).pipe(
      map(response => response.comments)
    );
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment);
  }
}
