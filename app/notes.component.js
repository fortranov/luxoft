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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var NotesComponent = (function () {
    function NotesComponent(http) {
        this.http = http;
        this.obj = {};
        this.notesUrl = 'http://localhost:8080/notes';
        this.readNotes();
    }
    NotesComponent.prototype.readNotes = function () {
        var _this = this;
        this.getNotes().then(function (notes) {
            _this.notes = notes;
            console.log(notes);
        });
    };
    NotesComponent.prototype.getNotes = function () {
        return this.http.get(this.notesUrl)
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    NotesComponent.prototype.addNote = function (note) {
        var _this = this;
        this.http.post(this.notesUrl, note).toPromise()
            .then(function (response) {
            console.log("note sent, response", response);
            _this.readNotes();
        });
    };
    NotesComponent.prototype.select = function (id, text) {
        this.obj.text = text;
        this.obj.id = id;
        this.text = text;
    };
    NotesComponent.prototype.edit = function () {
        var _this = this;
        var id = this.obj.id;
        this.obj.text = this.text;
        this.http.post(this.notesUrl + '/edit/' + id, this.obj).toPromise()
            .then(function (response) { return _this.readNotes(); });
    };
    /*  putNote(id: string) {
          this.http.put(this.notesUrl+'/'+id, "").toPromise()
              .then(response => console.log("Push to top, response", response) );
      }*/
    NotesComponent.prototype.add = function () {
        var note = { text: this.text, date: Date() };
        // this.notes.push(note);
        this.text = "";
        this.addNote(note);
    };
    /* sendToTop(id) {
        // let noteOne  = this.notes.splice(id,1)[0];
        // this.notes.unshift(noteOne);
         this.putNote(id);
     }*/
    NotesComponent.prototype.remove = function (id) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('id', id);
        this.http.delete(this.notesUrl, { search: params })
            .toPromise()
            .then(function (response) {
            console.log("note with id " + id + " removed, response", response);
            _this.readNotes();
        });
    };
    return NotesComponent;
}());
NotesComponent = __decorate([
    core_1.Component({
        selector: 'notes',
        template: "Notes list:\n    <table>\n        <tr *ngFor=\"let note of notes; let i=index\">\n           <td (click)=\"select(note._id, note.text)\">{{note.text}}</td> <td>{{note.date | date: 'HH:mm dd.MM.yyyy'}}</td> <td><button (click)=\"remove(note._id)\">remove!</button></td>\n        </tr>\n    </table>\n    <textarea [(ngModel)]=\"text\"></textarea>\n    <button (click)=\"add()\">Add</button>\n    <button (click)=\"edit()\">Edit</button>"
    }),
    __metadata("design:paramtypes", [http_1.Http])
], NotesComponent);
exports.NotesComponent = NotesComponent;
//# sourceMappingURL=notes.component.js.map