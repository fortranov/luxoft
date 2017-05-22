import {Component} from '@angular/core';
@Component({
    selector: 'notes',
    template: `Notes list:
    <ul>
        <li *ngFor="let note of notes; let i=index">
            {{note.text}} <button (click)="remove(i)">remove</button>
        </li>
    </ul>
    <textarea [(ngModel)]="text"></textarea>
    <button (click)="add()">Add</button>    `
})

export class NotesComponent {
    notes: Note[] = [
        {text:"Note one"},
        {text:"Note two"}
    ];
    text: string;

    add() {
        let note = { text: this.text };
        this.notes.push(note);
        this.text = "";
    }

    remove(idx) {
        this.notes.splice(idx,1);
    }
}
interface Note {
    text: string;
}
