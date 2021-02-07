import { Component, OnInit } from '@angular/core';
import { BibliographyService} from './bibliography.service';
import { BibliographicRecord } from './bibliographic-record';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    bibliography: string;

    constructor( private bibliographyService: BibliographyService ) {
    }

    ngOnInit(): void {
        this.bibliographyService.fetchBibliography( 3, this.getBibliographyCallback() );
    }

    private getBibliographyCallback(): (bibliography: BibliographicRecord[]) => void {
        return (bibliography) => {
            this.bibliography = JSON.stringify(bibliography, undefined, 4);
        };
    }
}
