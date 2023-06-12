import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user.model";


@Injectable()
export class AuthorizationService {
  constructor(private http: HttpClient) {}

  private isAuth = false;

  public login(){
    this.isAuth = true;
  }
  public logout(){
    this.isAuth=false;
  }
  public isLoggedIn(){
    return this.isAuth;
  }

  public getUsers(email: string):Observable<User> {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
      .pipe(map((user:any) => user[0] ? user[0] : undefined));
  }

  createUser(user:User){
    return this.http.post('http://localhost:3000/users', user);
  }

}
