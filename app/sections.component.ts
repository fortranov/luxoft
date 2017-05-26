/**
 * Created by st10902 on 5/24/2017.
 */
import {Component, EventEmitter, Output, Input} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {LoginService, LoginUser} from "./services/Login.service";

export interface Section {
    _id?: string;
    title: string;
}



@Component({
    selector: 'sections',
    templateUrl: 'templates/sections.component.html'
})

export class SectionsComponent {
    loginService: LoginService;
    private sectionsUrl = 'sections';
    sections: Section[];
    sectionsReplaceUrl = "/sections/replace";
    private activeSection: string;
    @Input()
    set section(section:string) {
        if (section && section.length>0) {
            this.activeSection = section;
        }
    }
    @Output() sectionChanged: EventEmitter<string> =
        new EventEmitter<string>();

    constructor(private http: Http) {
       // this.loginService.userLogin$.subscribe(user => this.readSections());
        this.readSections();
    }

    readSections() {
        this.getSections().subscribe(sections=>{
            this.sections=sections;
            if (this.activeSection == null && this.sections.length>0) {
                this.showSection(this.sections[0]);
            }
        });


    }

    getSections(): Observable<Section[]> {
        return this.http.get(this.sectionsUrl)
            .map(response => response.json() as Section[]);
    }

    showSection(section:Section) {
        //this.activeSection = section;
        this.sectionChanged.emit(section.title);
    }

    addSection(newSection: HTMLInputElement) {
        let title = newSection.value;
        if (!title) return;

        // check for duplicates
        if (this.sections.map(s=>s.title).find(t=>t===title)) return;

        const section: Section = { title };
        this.sections.unshift(section);
        this.showSection(section);

        // write sections to server and clear add section input box
        this.writeSections().subscribe(res=>newSection.value = "");
    }

    writeSections() {
        return this.http.post(this.sectionsReplaceUrl, this.sections);
    }
}