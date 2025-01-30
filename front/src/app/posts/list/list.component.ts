import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../../interfaces/post.interface";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public posts$!: Observable<Post[]>;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
  }

}
