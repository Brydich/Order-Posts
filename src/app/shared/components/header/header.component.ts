import { Component } from '@angular/core';
import {AuthorizationService} from "../../services/authorization.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent  {
  constructor(private authService: AuthorizationService,
              private router: Router) {}

  //Variables=========================
  isMenuOpen: boolean = false;
  //==================================

  toggleIsMenuOpen():void {
    if (this.isMenuOpen) { this.isMenuOpen = false }
    else { this.isMenuOpen = true }
  }
  onLogout () {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
