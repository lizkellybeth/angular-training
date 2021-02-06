import { Component } from '@angular/core';
import { BibliographyService} from './bibliography.service';
import { Bibliography } from './bibliography';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    bibliography: any;

    constructor( private bibliographyService: BibliographyService ) {
        bibliographyService.fetchBibliography( 3, this.getBibliographyCallback() );
    }

    private getBibliographyCallback(): (bibliography: Bibliography) => void {
        return (bibliography) => {
            this.bibliography = JSON.stringify(bibliography, undefined, 4);
        };
    }
}
