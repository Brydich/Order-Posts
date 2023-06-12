import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from "./pages.component";
import {MainComponent} from "./main/main.component";
import {NewsComponent} from "./news/news.component";
import {AuthorizationGuard} from "../shared/guards/authorization.guard";

const routes: Routes = [
  {path: 'pages', component: PagesComponent, canActivate: [AuthorizationGuard], children:[
      {path: 'main', component: MainComponent },
      {path: 'news', component: NewsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
