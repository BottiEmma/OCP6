import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Post} from "../interfaces/post.interface";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8080';
  }

  getPosts(): Observable<Post[]> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found, user is not authenticated!');
      return new Observable();
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<{ posts: Post[] }>(`${this.apiUrl}/posts`,  { headers }).pipe(
      map(response => response.posts)
    );
  }

  createPost(post: Post): Observable<Post> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, user is not authenticated!');
      return new Observable();
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Post>(`${this.apiUrl}/posts`, post, { headers });

  }

  public detail(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

}
