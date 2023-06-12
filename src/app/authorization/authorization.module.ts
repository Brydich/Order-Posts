import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { AuthorizationComponent } from "./authorization.component";
import { AuthorizationRoutingModule } from "./authorization-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    LoginComponent,             // Страница логина
    RegistrationComponent,      // Страница регистрации
    AuthorizationComponent,     // Оболочка для авторизации
  ],
  imports: [
    BrowserModule,              // Работа с браузером
    AuthorizationRoutingModule, // Маршрутизация
    ReactiveFormsModule,        // Работа с реактивными формами
  ],
  exports: [],
  providers: []
})
export class AuthorizationModule { }
