"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CanDeactivateNote = (function () {
    function CanDeactivateNote() {
    }
    CanDeactivateNote.prototype.canDeactivate = function (notesEditorComponent, route, state) {
        var note = notesEditorComponent.notesComponent.text;
        if (note && note.length > 0) {
            return window.confirm("You have entered the note.\n        Do you really want to change section?");
        }
        else
            return true;
    };
    return CanDeactivateNote;
}());
CanDeactivateNote = __decorate([
    core_1.Injectable()
], CanDeactivateNote);
exports.CanDeactivateNote = CanDeactivateNote;
//# sourceMappingURL=CanDeactivateNote.service.js.map