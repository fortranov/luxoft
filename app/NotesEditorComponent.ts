/**
 * Created by st10902 on 5/25/2017.
 */
import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotesComponent} from "./notes.component";

@Component({
    templateUrl: '/templates/notesEditorComponent.component.html'
})
export class NotesEditorComponent {
    section: string;
    name="John";
    @ViewChild(NotesComponent) notesComponent:NotesComponent;

    constructor(private route: ActivatedRoute, private router: Router) {
        this.route.params
            .map(params=>params["name"])
            .subscribe(section=>this.section=section);
    }

    setSection(section:string) {
        //  this.section = section;
        this.router.navigate([section]);
    }
}