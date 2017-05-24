import {Component} from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';



@Component({
    selector: 'notes',
    template: `Notes list:
    <table>
        <tr *ngFor="let note of notes; let i=index">
           <td (click)="select(note._id, note.text)">{{note.text}}</td> <td>{{note.date | date: 'HH:mm dd.MM.yyyy'}}</td> <td><button (click)="remove(note._id)">remove!</button></td>
        </tr>
    </table>
    <textarea [(ngModel)]="text"></textarea>
    <button (click)="add()">Add</button>
    <button (click)="edit()">Edit</button>`
})

export class NotesComponent {

    notes: Note[] ;
    obj = <Obj>{};
    text: string;

    constructor(private http: Http) {
        this.readNotes();
    }

    readNotes() {
        this.getNotes().then(notes=>{
            this.notes=notes;
            console.log(notes);
        });
    }

    private notesUrl = 'http://localhost:8080/notes';

    getNotes(): Promise<Note[]> {
        return this.http.get(this.notesUrl)
            .toPromise()
            .then(response => response.json() as Note[]);
    }

    addNote(note:Note) {
        this.http.post(this.notesUrl, note).toPromise()
            .then(response => {
                console.log("note sent, response", response);
                this.readNotes();
            } );
    }

    select(id: string, text:string) {
        this.obj.text = text;
        this.obj.id = id;
        this.text = text;
    }
    edit() {
        let id = this.obj.id;
        this.obj.text = this.text;
        this.http.post(this.notesUrl+'/edit/'+id, this.obj).toPromise()
            .then(response => this.readNotes() );
    }

  /*  putNote(id: string) {
        this.http.put(this.notesUrl+'/'+id, "").toPromise()
            .then(response => console.log("Push to top, response", response) );
    }*/





    add() {
        let note = { text: this.text, date: Date() };
       // this.notes.push(note);
        this.text = "";
        this.addNote(note);
    }

   /* sendToTop(id) {
       // let noteOne  = this.notes.splice(id,1)[0];
       // this.notes.unshift(noteOne);
        this.putNote(id);
    }*/

    remove(id:string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        this.http.delete(this.notesUrl, { search: params })
            .toPromise()
            .then(response => {
                console.log(
                    `note with id ${id} removed, response`, response);
                this.readNotes();
            });
    }
}
interface Note {
    text: string;
    date: string;
}

interface Obj {
    text: string;
    id: string;
}