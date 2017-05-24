import {Component} from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

interface Note {
    text: string;
    date: string;
}

@Component({
    selector: 'notes',
    template: `Notes list:
    <table>
        <tr *ngFor="let note of notes; let i=index">
            <td (click)="select(note._id, note.text)">{{note.text}}</td>
            <td>{{note.date | date: 'HH:mm dd.MM.yyyy'}}</td> 
            <td><button (click)="remove(note._id)">remove!</button></td>
        </tr>
    </table>
    <textarea [(ngModel)]="text"></textarea>
    <button (click)="add()">Add</button>
    <button (click)="edit()">Edit</button>`
})

export class NotesComponent {

    private notesUrl = 'http://localhost:8080/notes';

    notes: Note[] ;
    selectedId: string = '';
    text: string;

    constructor(private http: Http) {
        this.readNotes();
    }

    readNotes() {                                              //чтение записок из базы данных
        this.getNotes().then(notes=>{
            this.notes=notes;
            console.log(notes);
        });
    }

    getNotes(): Promise<Note[]> {
        return this.http.get(this.notesUrl)
            .toPromise()
            .then(response => response.json() as Note[]);
    }

    add() {                                                     //добавление новой записки
        let note = { text: this.text, date: Date() };
        this.text = "";
        this.addNote(note);
    }

    addNote(note:Note) {
        this.http.post(this.notesUrl, note).toPromise()
            .then(response => {
                console.log("note sent, response", response);
                this.readNotes();
            } );
    }

    remove(id:string) {                                         // удаление записки
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

    select(id: string, text:string) {                           // выбор записки
        this.selectedId = id;
        this.text = text;
    }
    edit() {                                                    // редактирование записки
        this.http.post(this.notesUrl+'/edit/'+this.selectedId, { text: this.text}).toPromise()
            .then(response => { this.readNotes(); this.text = ""; });
    }


}