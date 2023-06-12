import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/models/user.model";
import {PostService} from "../../shared/services/post.service";
import {Router} from "@angular/router";
import {Post} from "../../shared/models/post.model";
import {AuthorizationService} from "../../shared/services/authorization.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  constructor(private postService: PostService,
              private authService: AuthorizationService ) {}
  //Variables========================
  form!: FormGroup;
  userInfo: Post = {
    email: '',
    privatePosts: [],
    publicPosts: []
  };
  isOpenMenu: boolean = false;
  isShowCreatePost: boolean = false;
  isShowPrivatePosts: boolean = false;
  isAnyPublicPosts: boolean = false;
  isAnyPrivatePosts: boolean = false;
  user: User = {
    name: "",
    password: "",
    email: "",
    id: -1
  };
  //=================================
  ngOnInit ():void {
    this.form = new FormGroup({
      'title': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'text': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'isPrivate': new FormControl(false)
    });

    let userString = window.localStorage.getItem("user");
    if (userString != null) {
      this.user = JSON.parse(userString);
      this.authService.getUsers(this.user.email).subscribe((item:User)=>{
        this.user = item;
      });
    }

    this.postService.getPosts(this.user.email).subscribe((item:Post)=>{
      this.userInfo = item;
      if (this.userInfo?.privatePosts?.length > 0) { this.isAnyPrivatePosts = true; }
      if (this.userInfo?.publicPosts?.length > 0) { this.isAnyPublicPosts = true; }
    });

  }

  onSubmit() {
    if (this.user.id != undefined) {
      const data = this.form.value;
      console.log("Email=\""+this.user.email+"\"");
      this.postService.createNewPost(this.user.email, data.title, data.text, data.isPrivate, this.user.id);
      if (data.isPrivate) { this.isAnyPrivatePosts = true; }
      else { this.isAnyPublicPosts=true; }
    }

    setTimeout(()=>{
      this.postService.getPosts(this.user.email).subscribe((item:Post)=>{
        this.userInfo = item;
      });
    },1000);
  }

  toggleShowPosts ():void {
    if (this.isShowPrivatePosts) { this.isShowPrivatePosts = false; }
    else { this.isShowPrivatePosts = true; }
  }
  toggleShowMenu():void {
    if (this.isOpenMenu) { this.isOpenMenu = false; }
    else { this.isOpenMenu = true; }
  }

}
