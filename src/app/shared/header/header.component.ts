import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return this._authService.isAuthenticated();
  }

  onLogout() {
    this._authService.logout();
  }
}
