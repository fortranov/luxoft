/**
 * Created by st10902 on 5/26/2017.
 */

import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {LoginService, LoginUser} from "./services/Login.service";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
    selector: 'login-form',
    templateUrl: '/templates/loginForm.component.html'
})
export class LoginFormComponent {
    userForm: LoginUser = new LoginUser();
    failedLogin: boolean;

    constructor(private loginService: LoginService, private router: Router) {}

    login() {
        this.loginService.login(this.userForm)
            .subscribe(res=>res?this.onSuccessLogin():this.onFailLogin());
    }

    logout() {
        this.loginService.logout().subscribe(res=>this.onLogout());
    }


    onSuccessLogin() {
        this.router.navigateByUrl("/");
    }

    onFailLogin() {
        this.failedLogin = true;
        setTimeout(() => this.failedLogin = false, 1000);
    }

    onLogout() {
        this.router.navigateByUrl("/");
    }

    get loggedIn() {
        return this.loginService.loggedIn;
    }
}