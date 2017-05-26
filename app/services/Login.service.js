"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by st10902 on 5/26/2017.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
//import {Subject} from "@angular/core/src/facade/async";
//import {Subject} from "rxjs";
var Subject_1 = require("rxjs/Subject");
var LoginUser = (function () {
    function LoginUser() {
    }
    return LoginUser;
}());
exports.LoginUser = LoginUser;
var LoginService = (function () {
    function LoginService(http) {
        this.http = http;
        this.loginUrl = 'login'; // URL to web api
        this.logoutUrl = 'logout'; // URL to web api
        this.loggedIn = false;
        this.userLoginSource = new Subject_1.Subject();
        this.userLogin$ = this.userLoginSource.asObservable();
    }
    LoginService.prototype.login = function (user) {
        var _this = this;
        return this.http.post(this.loginUrl, user)
            .map(function (response) { return response.json(); })
            .do(function (res) { if (res)
            _this.userLogin(user); });
    };
    LoginService.prototype.logout = function () {
        var _this = this;
        return this.http.get(this.logoutUrl)
            .do(function (res) { return _this.userLogout(); });
    };
    LoginService.prototype.userLogin = function (user) {
        this.loggedIn = true;
    };
    LoginService.prototype.userLogout = function () {
        this.loggedIn = false;
    };
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=Login.service.js.map