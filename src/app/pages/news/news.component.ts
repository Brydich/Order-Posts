import { Component, OnInit } from '@angular/core';
import { Post } from "../../shared/models/post.model";
import { PostService } from "../../shared/services/post.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit{
  constructor(private postService: PostService) {}

  //Variables========================
  isEndPost: boolean = false;
  private addPostsNumber = 1;
  private totalPosts = 1;
  arrayPosts: Post[] = [
    {
      email: '',
      publicPosts: [],
      privatePosts: []
    }
  ];
  getArrayPosts: Post[] = [
    {
      email: '',
      publicPosts: [],
      privatePosts: []
    }
  ];
  //=================================

  ngOnInit() {
    this.arrayPosts = this.postService.getAllPosts(1, this.totalPosts);
  }

  addPosts():void {
    if (this.isEndPost) {
      console.log("Posts end");
      return;
    }
    this.getArrayPosts = this.postService.getAllPosts(this.totalPosts + 1, this.totalPosts + this.addPostsNumber);
    setTimeout(()=>{
      if (this.getArrayPosts.length < 1) {
        this.isEndPost = true;
        return;
      }
      for (let item of this.getArrayPosts) {
        this.arrayPosts.push(item);
      }
      this.arrayPosts.concat(this.getArrayPosts);
      this.totalPosts += this.addPostsNumber;
    }, 1000);
  }
}
