import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthorizationModule } from "./authorization/authorization.module";
import { HttpClientModule } from '@angular/common/http';
import { PagesModule } from "./pages/pages.module";
import { AuthorizationService } from "./shared/services/authorization.service";
import { PostService } from "./shared/services/post.service";
import { NotFoundComponent } from './shared/components/not-found/not-found.component';


@NgModule({
  imports: [
    BrowserModule,          // работа с браузером
    PagesModule,            // модуль всех страниц
    AuthorizationModule,    // модуль авторизации
    FormsModule,            // работа с формами
    ReactiveFormsModule,    // работа с реактивными формами
    HttpClientModule,       // модуль взаимодействия с сервером
    AppRoutingModule        // модуль маршрутизации
  ],
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  bootstrap: [AppComponent],
  providers: [              // Services
    AuthorizationService,
    PostService
  ],
  exports: []
})
export class AppModule { }
