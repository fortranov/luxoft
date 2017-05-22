"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NotesComponent = (function () {
    function NotesComponent() {
        this.notes = [
            { text: "Note one" },
            { text: "Note two" }
        ];
    }
    NotesComponent.prototype.add = function () {
        var note = { text: this.text };
        this.notes.push(note);
        this.text = "";
    };
    NotesComponent.prototype.remove = function (idx) {
        this.notes.splice(idx, 1);
    };
    return NotesComponent;
}());
NotesComponent = __decorate([
    core_1.Component({
        selector: 'notes',
        template: "Notes list:\n    <ul>\n        <li *ngFor=\"let note of notes; let i=index\">\n            {{note.text}} <button (click)=\"remove(i)\">remove</button>\n        </li>\n    </ul>\n    <textarea [(ngModel)]=\"text\"></textarea>\n    <button (click)=\"add()\">Add</button>    "
    })
], NotesComponent);
exports.NotesComponent = NotesComponent;
//# sourceMappingURL=notes.component.js.map