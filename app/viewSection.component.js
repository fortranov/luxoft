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
 * Created by st10902 on 5/25/2017.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var NotesServer_service_1 = require("./services/NotesServer.service");
var ViewSectionComponent = (function () {
    function ViewSectionComponent(route, noteServer) {
        this.route = route;
        this.noteServer = noteServer;
    }
    ViewSectionComponent.prototype.ngOnInit = function () {
        this.section = this.route.snapshot.params["name"];
        this.notes$ = this.getNotes();
    };
    ViewSectionComponent.prototype.getNotes = function () {
        return this.noteServer.getNotes(this.section);
    };
    return ViewSectionComponent;
}());
ViewSectionComponent = __decorate([
    core_1.Component({
        templateUrl: '/templates/viewSection.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        NotesServer_service_1.NotesServerService])
], ViewSectionComponent);
exports.ViewSectionComponent = ViewSectionComponent;
//# sourceMappingURL=viewSection.component.js.map