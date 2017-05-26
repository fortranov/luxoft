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
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var UserUniqueValidator = UserUniqueValidator_1 = (function () {
    function UserUniqueValidator(http) {
        this.http = http;
    }
    UserUniqueValidator.prototype.validate = function (c) {
        var _this = this;
        var user = c.value;
        var params = new http_1.URLSearchParams();
        params.set('user', user);
        return new Promise(function (resolve) {
            return _this.http.get("checkUserUnique", { search: params })
                .map(function (response) { return response.json(); })
                .subscribe(function (res) {
                return res ? resolve(null) : resolve({ userUniqueValid: false });
            });
        });
    };
    return UserUniqueValidator;
}());
UserUniqueValidator = UserUniqueValidator_1 = __decorate([
    core_1.Directive({
        selector: '[userUniqueValid][formControlName],[userUniqueValid][ngModel]',
        providers: [{ provide: forms_1.NG_ASYNC_VALIDATORS,
                useExisting: UserUniqueValidator_1, multi: true }]
    }),
    __metadata("design:paramtypes", [http_1.Http])
], UserUniqueValidator);
exports.UserUniqueValidator = UserUniqueValidator;
var UserUniqueValidator_1;
//# sourceMappingURL=UserUniqueValidator.js.map