/**
 * Created by st10902 on 5/25/2017.
 */
import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NotesServerService} from "./services/NotesServer.service";
import {Note} from "./notes.component";
import {Observable} from "rxjs/Observable";

@Component({
    templateUrl: '/templates/viewSection.component.html'
})
export class ViewSectionComponent {
    section: string;
    notes: Note[];
    notes$: Observable<Note[]>;

    constructor(private route: ActivatedRoute,
                private noteServer: NotesServerService) {
    }
    ngOnInit() {
        this.section = this.route.snapshot.params["name"];
        this.notes$ = this.getNotes();
    }
    getNotes() {
        return this.noteServer.getNotes(this.section);
    }
}