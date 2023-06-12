import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {PagesComponent} from "./pages.component";
import {RouterOutlet} from "@angular/router";
import {PagesRoutingModule} from "./pages-routing.module";
import {HeaderComponent} from "../shared/components/header/header.component";
import {FooterComponent} from "../shared/components/footer/footer.component";
import { MainComponent } from './main/main.component';
import { NewsComponent } from './news/news.component';


@NgModule({
  declarations: [
    PagesComponent,       // Оболочка для всех страниц
    HeaderComponent,      // Шапка сайта
    FooterComponent,      // Нижняя часть сайта
    MainComponent,        // Главная страница сайта
    NewsComponent,        // Страница новостей (лента новостей)
  ],
  imports: [
    BrowserModule,        // Работа с браузером
    FormsModule,          // Работа с формами
    ReactiveFormsModule,  // Работа с реактивными формами
    RouterOutlet,         // Загрузка нужной страницы при соответсвующей адресной строке
    PagesRoutingModule,   // Маршрутизация страниц
  ],
  providers: [],          // Services
  exports: []
})
export class PagesModule {}
