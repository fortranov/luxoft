import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: '/templates/app.component.html'
})
export class AppComponent {
    section: string;
    name="John";

    setSection(section:string) {
        this.section = section;
    }
}