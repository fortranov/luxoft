"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var notes_component_1 = require("./notes.component");
var sections_component_1 = require("./sections.component");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var NotesEditorComponent_1 = require("./NotesEditorComponent");
var PageNotFoundComponent_1 = require("./PageNotFoundComponent");
var viewSection_component_1 = require("./viewSection.component");
var NotesServer_service_1 = require("./services/NotesServer.service");
var CanDeactivateNote_service_1 = require("./services/CanDeactivateNote.service");
var appRoutes = [
    { path: '', component: NotesEditorComponent_1.NotesEditorComponent,
        canDeactivate: [CanDeactivateNote_service_1.CanDeactivateNote] },
    { path: 'viewSection/:name', component: viewSection_component_1.ViewSectionComponent },
    { path: ':name', component: NotesEditorComponent_1.NotesEditorComponent,
        canDeactivate: [CanDeactivateNote_service_1.CanDeactivateNote] },
    { path: '**', component: PageNotFoundComponent_1.PageNotFoundComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, router_1.RouterModule.forRoot(appRoutes), forms_1.FormsModule, http_1.HttpModule],
        declarations: [app_component_1.AppComponent, notes_component_1.NotesComponent, sections_component_1.SectionsComponent, NotesEditorComponent_1.NotesEditorComponent, PageNotFoundComponent_1.PageNotFoundComponent, viewSection_component_1.ViewSectionComponent],
        bootstrap: [app_component_1.AppComponent],
        providers: [NotesServer_service_1.NotesServerService, CanDeactivateNote_service_1.CanDeactivateNote]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map