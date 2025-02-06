import { Component, OnInit } from '@angular/core';
import {map, Observable} from "rxjs";
import {Post} from "../../interfaces/post.interface";
import {PostService} from "../../services/post.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public posts$!: Observable<Post[]>;
  usersMap: Map<number, string> = new Map();
  sortDescending: boolean = true;

  constructor(private postService: PostService, private userService: UserService) { }

  ngOnInit(): void {

    this.loadPosts();


    this.posts$.subscribe(posts => {
      posts.forEach(post => {
        this.userService.getUserById(post.authorId).subscribe(user => {
          this.usersMap.set(post.authorId, user.username);
        });
      });
    });
  }

  loadPosts(): void {
    this.posts$ = this.postService.getPosts().pipe(
      map(posts => this.sortDescending
        ? posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        : posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      )
    );
  }

  getUsername(authorId: number): string {
    return this.usersMap.get(authorId) || '';
  }

  toggleSort(): void {
    this.sortDescending = !this.sortDescending; // Toggle sort order
    this.loadPosts(); // Reload with new sorting order
  }

}
