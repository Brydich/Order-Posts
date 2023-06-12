import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthorizationService } from "../../shared/services/authorization.service";
import { Router } from "@angular/router";
import { User } from "../../shared/models/user.model"

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  constructor(private authService: AuthorizationService,
              private router: Router) {}

  //Variables========================
  form!: FormGroup;
  StartPage: string = "../../pages/main";
  //=================================

  ngOnInit() :void {
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null,[Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    const{name, email, password} = this.form.value;
    const user = new User(name, password, email);

    this.authService.createUser(user).subscribe(()=>{
        this.authService.login();
        window.setTimeout(()=>{
          window.localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate([this.StartPage], {
            queryParams:{
              canLogin: true
            }
          });
        }, 2000);
      });
  }

}
