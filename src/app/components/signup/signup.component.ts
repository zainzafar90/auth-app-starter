import { AuthService } from './../../services/auth.service';
import { User } from './../../modals/user';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  user = new User();

  constructor(private _authService: AuthService) { }

  onSignUp() {
    let email = this.user.email;
    let password = this.user.password;

    this._authService.signup(email, password)
      .catch(function (error) {
        console.log("Error has occured");
      })
      .then(function (user) {
        console.log("User successfully created!");
      });
  }

}
