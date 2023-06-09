import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userLogged = false;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.userLogged = Boolean(localStorage.getItem('isLoggedIn'));
  }

  logout() {
    this.authenticationService.logout();
    this.userLogged = false;
  }
}