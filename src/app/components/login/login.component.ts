import { AuthService } from './../../services/auth.service';
import { User } from './../../modals/user';
import { Component } from '@angular/core';
AuthService
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = new User();

  constructor(private _authService: AuthService) { }

  onLogin() {

    let email = this.user.email;
    let password = this.user.password;

    this._authService.login(email, password)
      .catch(function (error) {
        console.log("Error has occured");
      })
      .then(function (user) {
        console.log("User successfully logged in!");
      });
  }

  signInWithGoogle() {
    this._authService.loginWithGoogle()
      .catch(function (error) {
        console.log("Error has occured");
      })
      .then(function (user) {
        console.log("User successfully logged in!");
      });
  }

}
