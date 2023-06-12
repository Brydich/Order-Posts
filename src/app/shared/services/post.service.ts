import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "../models/post.model"
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class PostService {
  constructor(private http: HttpClient) {}

  createNewPost (email: string, title: string, text: string, isPrivate: boolean = false, idUser: number = 0) {
    return this.getPosts(email).subscribe((getPost:Post)=>{
      if (getPost?.id != undefined && typeof (getPost?.id) == "number") {
        if (getPost.id == idUser) {
          if (isPrivate) {
            getPost.privatePosts.push({title: title, text: text});
            return this.http.patch(`http://localhost:8000/posts/${getPost.id}`, {
              "privatePosts": getPost.privatePosts,
            }).subscribe();
          }
          else {
            getPost.publicPosts.push({title: title, text: text});
            return this.http.patch(`http://localhost:8000/posts/${getPost.id}`, {
              "publicPosts": getPost.publicPosts,
            }).subscribe();
          }
        } else {
          return;
        }
      } else {
        if (isPrivate) {
          let newPost: Post = {
            "email": email,
            "publicPosts": [],
            "privatePosts": [
              {
                "title": title,
                "text": text
              }
            ],
            "id": idUser
          }
          return this.http.post("http://localhost:8000/posts", newPost).subscribe();
        }
        else {
          let newPost: Post = {
            "email": email,
            "publicPosts": [
              {
                "title": title,
                "text": text
              }
            ],
            "privatePosts": [],
            "id": idUser
          }
          return this.http.post('http://localhost:8000/posts', newPost).subscribe();
        }
        return;
      }
    });
  }

  public getPosts(email: string):Observable<Post> {
    return this.http.get(`http://localhost:8000/posts?email=${email}`)
      .pipe(map((post:any) => post[0] ? post[0] : undefined));
  }

  public getAllPosts (start: number, end: number) :Array<Post> {
    let arrayPosts: Array <Post> = [];
    for (; start < end+1; start++) {
      this.http.get(`http://localhost:8000/posts?id=${start}`)
        .pipe(map((post:any) => post[0] ? post[0] : undefined))
        .subscribe((item:Post)=>{
          if (item != undefined) {
            arrayPosts.push(item);
          } else {
            return;
          }
      });
    }

    return arrayPosts;
  }

}
