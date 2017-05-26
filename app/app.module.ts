import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent }   from './app.component';
import { NotesComponent } from './notes.component';
import { SectionsComponent } from './sections.component';
import { HttpModule }    from '@angular/http';
import {Routes, RouterModule} from "@angular/router";
import {NotesEditorComponent} from "./NotesEditorComponent";
import {PageNotFoundComponent} from "./PageNotFoundComponent";
import {ViewSectionComponent} from "./viewSection.component";
import {NotesServerService} from "./services/NotesServer.service";
import {CanDeactivateNote} from "./services/CanDeactivateNote.service";
import {UserFormComponent} from "./userForm.component";
import {EqualToValidator} from "./directives/EqualToValidator";
import {UserUniqueValidator} from "./directives/UserUniqueValidator";
import {LoginService} from "./services/Login.service";
import {LoginFormComponent} from "./loginForm.component";


const appRoutes: Routes = [
    { path: '', component: NotesEditorComponent,
        canDeactivate: [CanDeactivateNote] },
    { path: 'viewSection/:name', component: ViewSectionComponent },
    { path: 'register', component: UserFormComponent },
    { path: ':name', component: NotesEditorComponent,
        canDeactivate: [CanDeactivateNote] },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports:      [ BrowserModule, RouterModule.forRoot(appRoutes), FormsModule, HttpModule  ],
    declarations: [ AppComponent, NotesComponent, SectionsComponent, NotesEditorComponent, PageNotFoundComponent,
        ViewSectionComponent, UserFormComponent, EqualToValidator, UserUniqueValidator, LoginFormComponent  ],
    bootstrap:    [ AppComponent ],
    providers:    [ NotesServerService, CanDeactivateNote, LoginService ]
})
export class AppModule { }