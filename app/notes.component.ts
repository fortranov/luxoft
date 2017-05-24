import {Component, Input, OnInit} from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";

interface Note {
    text: string;
    date: string;
}

@Component({
    selector: 'notes',
    templateUrl: 'templates/notes.component.html'
})

export class NotesComponent {
    @Input() section: string;
    private notesUrl = 'http://localhost:8080/notes';

    notes: Note[] ;
    selectedId: string = '';
    text: string;


    constructor(private http: Http) {
     //   this.readNotes();
    }

    ngOnChanges() {
        this.readNotes();
    }

    readNotes() {                                              //чтение записок из базы данных
        this.getNotes().subscribe(notes=>{
            this.notes=notes;
            console.log(notes);
        });
    }

    getNotes(): Observable<Note[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('section', this.section);
        return this.http.get(this.notesUrl, {search:params})
            .map(response => response.json() as Note[]);
    }

    add() {                                                     //добавление новой записки
        let note = { text: this.text, section: this.section, date: Date() };
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