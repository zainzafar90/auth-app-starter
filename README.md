# AuthAppStarter

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.26.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them
+ Node.js up and running.
+ NPM (Node package manager) 

If you get the versions Node 4.x.x and NPM 3.x.x. or higher you are all set. If not you have to get the latest versions

### Setup

Before moving forward go to the app directory and download all the dependencies using command-line/terminal
```
npm install
```

## Development server
Run `ng serve` for a dev server. 

Navigate to `http://localhost:4200/`.

## 1. Creating a Route

We'll create a file called **app.routes.ts**

Add the following code 
```Typescript
import { Routes, RouterModule } from '@angular/router';

// Components
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';


export const appRoutes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignupComponent },
    { path: 'profile', component: ProfileComponent},
    { path: '**', redirectTo: 'login' }

];

```

Now open ```src/app/app.module.ts```

+ import **Routes, RouterModule** & **appRoutes** dependencies
```Typescript
import { Routes, RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';

```

+ include the appRoutes as 
```Typescript
 @NgModule({
     
    imports: [
    ...
    RouterModule.forRoot(appRoutes)
  ],
 })
 export class AppModule { }
```

Open ```src/app/app.component.html```

Add ```<router-outlet></router-outlet>```

```html
<app-header></app-header>
<div class="container">
    <div class="row">
        <div class="col-sm-12">
            <router-outlet></router-outlet>
        </div>
    </div>
</div>
```
Now you should be able to navigate through the routes

Also update your ```src/app/shared/header.component.html```

```html
<div id="navbar" class="collapse navbar-collapse">
    <ul class="nav navbar-nav">
        <li *ngIf="!isAuthenticated()">
            <a [routerLink]="['/login']">Login</a>
        </li>
        <li *ngIf="!isAuthenticated()">
            <a [routerLink]="['/sign-up']">Register</a>
        </li>
        <li>
            <a [routerLink]="['/profile']">Profile</a>
        </li>
    </ul>
    <ul class="nav navbar-nav navbar-right" *ngIf="isAuthenticated()">
        <li>
            <a (click)="onLogout()">Logout</a>
        </li>
    </ul>
</div>
```

## 2. Include Firebase into your index.html
- [Firebase Setup](https://firebase.google.com/docs/web/setup)

Your keys config will look something like This
```html
<script src="https://www.gstatic.com/firebasejs/3.6.9/firebase.js"></script>
<script>
  // Initialize Firebase
  // TODO: Replace with your project's customized code snippet
  var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
  };
  firebase.initializeApp(config);
</script>
``` 
Include it in the head of your index.html

**Note:** You don't need to have storage or bucket configuration as we are not going to use it.

## 3. Integrate Firebase into your application

Now open ```src/app/services/auth.service.ts```

```Typescript
import { Injectable } from '@angular/core';
declare var firebase: any;

@Injectable()
export class AuthService {

  constructor() { }

  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    return firebase.auth().signInWithPopup(provider);
  }

  isAuthenticated() {
    var user = firebase.auth().currentUser;
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    firebase.auth().signOut();
  }
}
```


## 4. Protect a route using AuthGaurd

Add a service named auth-gaurd to services
```
ng generate service services/auth-gaurd
```

Use the following code and update the auth-gaurd service
```Typescript
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGaurdService implements CanActivate {

  constructor(private _authService: AuthService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this._authService.isAuthenticated();
  }

}
```

Open ```src/app/app.module.ts``` once again


+ include the auth-gaurd  service in providers

```Typescript
 @NgModule({
     
    providers: [
     AuthGaurdService
  ],
 })
 export class AppModule { }
```

Now open ```src/app/app.routes.ts``` and update the following line 

``` Typescript
 { path: 'profile', component: ProfileComponent] }
```

with the following code

``` Typescript 
 { path: 'profile', component: ProfileComponent, canActivate: [AuthGaurdService] }
```

and YOU ARE ALL SET !!

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
