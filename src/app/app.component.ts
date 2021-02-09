import { Component, OnInit } from '@angular/core';
import { GitHubOrganizationService} from './git-hub-organization.service';
import { GitHubOrganization } from './git-hub-organization';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    gitHubOrganizations: string;

    constructor( private gitHubOrganizationService: GitHubOrganizationService ) {
    }

    ngOnInit(): void {
        this.gitHubOrganizationService.fetchOrganizations( 3, this.getOrganizationsCallback() );
    }

    private getOrganizationsCallback(): (array: GitHubOrganization[]) => void {
        return (organizationArray) => {
            this.gitHubOrganizations = JSON.stringify(organizationArray, undefined, 4);
        };
    }
}
