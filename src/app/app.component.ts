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

        // Solution 1: handle with success and failure in the client code
        this.gitHubOrganizationsService
            .fetchOrganizations1( 3 )
            .then( organizations => this.gitHubOrganizations = JSON.stringify( organizations, undefined, 4 ))
            .catch( error => console.error( '>>> Local error handling', JSON.stringify( error )));

        // Solution 2a: centralized error handling, inline callback
        this.gitHubOrganizationsService
            .fetchOrganizations2( 3 )
            .then( organizations => this.gitHubOrganizations = JSON.stringify( organizations, undefined, 4 ));

        // Solution 2b: centralized error handling, fully-typed callback
        this.gitHubOrganizationsService
            .fetchOrganizations2( 3 )
            .then( this.organizationsHandler );

        // Solution 3: central error handling is disabled, fully-typed callback
        this.gitHubOrganizationsService
            .fetchOrganizations3( 3, false )
            .then( this.organizationsHandler )
            .catch( error => console.error( '>>> Local error handling', JSON.stringify( error )));
    }

    private organizationsHandler( organizations: void | GitHubOrganization[] ): void {
        // The input parameter organizations can be undefined if an error
        // conditions was triggered
        if ( organizations ) {
            this.gitHubOrganizations = JSON.stringify( organizations, undefined, 4 );
        }
    }
}
