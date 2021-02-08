import {Component, OnInit} from '@angular/core';
import {BibliographyService} from './bibliography.service';
import {BibliographicRecord} from './bibliographic-record';
import {ProposalsService} from './proposals.service';
import {Proposal} from './proposal';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor( private bibliographyService: BibliographyService,
                 private proposalService: ProposalsService ) {
    }

    bibliography: string;
    proposalTable: string;
    errorMessage: string;

    static getMeaningfulMessage(error): string {
        return `${error.error.error} (${error.error.status}): ${error.error.message}`;
    }

    // Simple callback for putting up an alert message
    static alertErrorCallback( error ): void {
        alert( AppComponent.getMeaningfulMessage( error ));
    }

    ngOnInit(): void {
        // Call the bibliography service three times with an invalid parameter (to trigger an error response),
        // passing (a) no error callback, (b) the alert callback and (c) the display error callback
        this.bibliographyService.fetchBibliography( 'a', this.getBibliographyCallback() );
        this.bibliographyService.fetchBibliography( 'a', this.getBibliographyCallback(), AppComponent.alertErrorCallback );
        this.bibliographyService.fetchBibliography( 'a', this.getBibliographyCallback(), this.getDisplayErrorCallback() );

        this.proposalService.fetchBProposals( '2018.A', this.getProposalsCallback() );
    }

    // Closure callback to display the error message in the browser
    private getDisplayErrorCallback(): (x) => void {
        return (error) => {
            this.errorMessage = AppComponent.getMeaningfulMessage( error );
        };
    }

    private getBibliographyCallback(): (bibliography: BibliographicRecord[]) => void {
        return (bibliography) => {
            this.bibliography = JSON.stringify(bibliography, undefined, 4);
        };
    }

    private getProposalsCallback(): (proposals: Proposal[]) => void {
        return (proposals) => {
            let proposalsTable = '';
            proposals.forEach(proposal => {
                proposalsTable += `${proposal.code.padEnd(15)} ${proposal.piName.padEnd(30)} ${proposal.title}\n`;
            });
            this.proposalTable = proposalsTable;
        };
    }
}
