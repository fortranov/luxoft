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
var notes_component_1 = require("./notes.component");
var NotesEditorComponent = (function () {
    function NotesEditorComponent(route, router) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.name = "John";
        this.route.params
            .map(function (params) { return params["name"]; })
            .subscribe(function (section) { return _this.section = section; });
    }
    NotesEditorComponent.prototype.setSection = function (section) {
        //  this.section = section;
        this.router.navigate([section]);
    };
    return NotesEditorComponent;
}());
__decorate([
    core_1.ViewChild(notes_component_1.NotesComponent),
    __metadata("design:type", notes_component_1.NotesComponent)
], NotesEditorComponent.prototype, "notesComponent", void 0);
NotesEditorComponent = __decorate([
    core_1.Component({
        templateUrl: '/templates/notesEditorComponent.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router])
], NotesEditorComponent);
exports.NotesEditorComponent = NotesEditorComponent;
//# sourceMappingURL=NotesEditorComponent.js.map