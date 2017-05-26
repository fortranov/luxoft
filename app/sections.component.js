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
 * Created by st10902 on 5/24/2017.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var SectionsComponent = (function () {
    function SectionsComponent(http) {
        this.http = http;
        this.sectionsUrl = 'sections';
        this.sectionsReplaceUrl = "/sections/replace";
        this.sectionChanged = new core_1.EventEmitter();
        // this.loginService.userLogin$.subscribe(user => this.readSections());
        this.readSections();
    }
    Object.defineProperty(SectionsComponent.prototype, "section", {
        set: function (section) {
            if (section && section.length > 0) {
                this.activeSection = section;
            }
        },
        enumerable: true,
        configurable: true
    });
    SectionsComponent.prototype.readSections = function () {
        var _this = this;
        this.getSections().subscribe(function (sections) {
            _this.sections = sections;
            if (_this.activeSection == null && _this.sections.length > 0) {
                _this.showSection(_this.sections[0]);
            }
        });
    };
    SectionsComponent.prototype.getSections = function () {
        return this.http.get(this.sectionsUrl)
            .map(function (response) { return response.json(); });
    };
    SectionsComponent.prototype.showSection = function (section) {
        //this.activeSection = section;
        this.sectionChanged.emit(section.title);
    };
    SectionsComponent.prototype.addSection = function (newSection) {
        var title = newSection.value;
        if (!title)
            return;
        // check for duplicates
        if (this.sections.map(function (s) { return s.title; }).find(function (t) { return t === title; }))
            return;
        var section = { title: title };
        this.sections.unshift(section);
        this.showSection(section);
        // write sections to server and clear add section input box
        this.writeSections().subscribe(function (res) { return newSection.value = ""; });
    };
    SectionsComponent.prototype.writeSections = function () {
        return this.http.post(this.sectionsReplaceUrl, this.sections);
    };
    return SectionsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], SectionsComponent.prototype, "section", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SectionsComponent.prototype, "sectionChanged", void 0);
SectionsComponent = __decorate([
    core_1.Component({
        selector: 'sections',
        templateUrl: 'templates/sections.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], SectionsComponent);
exports.SectionsComponent = SectionsComponent;
//# sourceMappingURL=sections.component.js.map