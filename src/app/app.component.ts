import { Component, OnInit } from '@angular/core';
import { GitHubOrganizationsService } from './git-hub-organizations.service';
import { GitHubOrganization } from './git-hub-organization';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    gitHubOrganizations: string = undefined;

    constructor( private gitHubOrganizationsService: GitHubOrganizationsService ) {
    }

    ngOnInit(): void {

        this.gitHubOrganizationsService
            .fetchOrganizations( 3 )
            .then( organizations => this.gitHubOrganizations = JSON.stringify( organizations, undefined, 4 ));

        this.gitHubOrganizationsService
            .fetchOrganizations( 3 )
            .then( this.organizationsCallback );

        this.gitHubOrganizationsService
            .fetchOrganizations( 3, false )
            .then( this.organizationsCallback )
            .catch( error => console.error( '>>> Local error handling', JSON.stringify( error )));
    }

    private organizationsCallback( organizations: void | GitHubOrganization[] ): void {
        // The input parameter organizations can be undefined if an error
        // conditions was triggered
        if ( organizations ) {
            this.gitHubOrganizations = JSON.stringify( organizations, undefined, 4 );
        }
    }
}
