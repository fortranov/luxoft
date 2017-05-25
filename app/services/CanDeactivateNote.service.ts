import {Injectable} from "@angular/core";
import {NotesEditorComponent} from "../NotesEditorComponent";
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CanDeactivateNote implements CanDeactivate<NotesEditorComponent> {

    canDeactivate(
        notesEditorComponent: NotesEditorComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        const note = notesEditorComponent.notesComponent.text;
        if (note && note.length>0) {
            return window.confirm(
                `You have entered the note.
        Do you really want to change section?`);
        } else return true;
    }
}