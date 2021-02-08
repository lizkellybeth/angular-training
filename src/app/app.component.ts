import { Component, OnInit } from '@angular/core';
import { BibliographyService} from './bibliography.service';
import { BibliographicRecord } from './bibliographic-record';
import {ProposalsService} from './proposals.service';
import {Proposal} from './proposal';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    bibliography: string;
    proposalTable: string;

    constructor( private bibliographyService: BibliographyService,
                 private proposalService: ProposalsService ) {
    }

    ngOnInit(): void {
        this.bibliographyService.fetchBibliography( 3, this.getBibliographyCallback() );
        this.proposalService.fetchBProposals( '2018.A', this.getProposalsCallback() );
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
