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
    const token = localStorage.getItem('token'); // Retrouve le token conservé

    if (!token) {
      console.error('No token found, user is not authenticated!');
      return new Observable(); // Retourne un observable vide si pas de token
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
