import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  login(email: string, password: string) {
    return null;
  }

  signup(email: string, password: string) {
    return null;
  }

  loginWithGoogle() {
    return null;
  }

  isAuthenticated() {
   return false;
  }

  logout() {
  }
}