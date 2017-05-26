/**
 * Created by st10902 on 5/26/2017.
 */
import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
//import {Subject} from "@angular/core/src/facade/async";
//import {Subject} from "rxjs";
import { Subject }    from 'rxjs/Subject';

export class LoginUser {
    name: string;
    password: string;
}


@Injectable()
export class LoginService {
    private loginUrl = 'login';  // URL to web api
    private logoutUrl = 'logout';  // URL to web api
    loggedIn: boolean = false;
    private userLoginSource = new Subject<LoginUser>();
    userLogin$ = this.userLoginSource.asObservable();

    constructor(private http: Http) { }

    login(user: LoginUser): Observable<boolean> {
        return this.http.post(this.loginUrl, user)
            .map(response => response.json() as boolean)
            .do(res => { if (res) this.userLogin(user) });
    }

    logout() {
        return this.http.get(this.logoutUrl)
            .do(res => this.userLogout());
    }

    userLogin(user: LoginUser) {
        this.loggedIn = true;
    }

    userLogout() {
        this.loggedIn = false;
    }
}