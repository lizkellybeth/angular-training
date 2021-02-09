import { Component, OnInit } from '@angular/core';
import { GitHubOrganizationsService } from './git-hub-organizations.service';
import { GitHubOrganization } from './git-hub-organization';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    gitHubOrganizations: string;

    constructor( private gitHubOrganizationsService: GitHubOrganizationsService ) {
    }

    ngOnInit(): void {
        this.gitHubOrganizationsService.fetchOrganizations( 3, this.organizationsCallbackClosure() );
    }

    private organizationsCallbackClosure(): (organizations: GitHubOrganization[]) => void {
        return (organizations) => {
            this.gitHubOrganizations = JSON.stringify(organizations, undefined, 4);
        };
    }
}
