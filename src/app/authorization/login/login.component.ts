import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from "../../shared/services/authorization.service";
import { Router } from "@angular/router";
import { User } from "../../shared/models/user.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthorizationService,
              private router: Router) {}

  //Variables========================
  form!: FormGroup;
  StartPage: string = "../../pages/main";
  //=================================

  ngOnInit() :void {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit(){
    const formData = this.form.value;

    this.authService.getUsers(formData.email).subscribe((user: User)=>{
      if (user){
        if(user.password===formData.password){

          window.localStorage.setItem('user', JSON.stringify(user));
          this.authService.login();

          window.setTimeout(()=>{
            this.router.navigate([this.StartPage], {
              queryParams:{
                canLogin: true
              }
            });
          }, 2000);


        } else{ // Неправильный пароль

        }
      } else { // Такого пользователя не существует

      }
    });

  }

}
