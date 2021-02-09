import { Component, OnInit } from '@angular/core';
import { GitHubOrganizationsService } from './git-hub-organizations.service';
import { GitHubOrganization } from './git-hub-organization';
import { GitHubUsersService } from './git-hub-users.service';
import { GitHubUser } from './git-hub-user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    gitHubOrganizations: string;
    gitHubUsers: string;

    constructor( private gitHubOrganizationsService: GitHubOrganizationsService,
                 private gitHubUsersService: GitHubUsersService ) {
    }

    ngOnInit(): void {
        this.gitHubOrganizationsService.fetchOrganizations( 3, this.organizationsCallbackClosure() );
        this.gitHubUsersService.fetchUsers( 10, this.usersCallbackClosure() );
    }

    private organizationsCallbackClosure(): (organizations: GitHubOrganization[]) => void {
        return (organizations) => {
            this.gitHubOrganizations = JSON.stringify(organizations, undefined, 4);
        };
    }

    private usersCallbackClosure(): (users: GitHubUser[]) => void {
        return (users) => {
            this.gitHubUsers = '';
            users.forEach( user => {
                this.gitHubUsers += `${user.id.toString().padStart(6).padEnd(10)} ${user.login.padEnd(15)} ${user.type} ${user.site_admin}\n`;
            });
        };
    }
}
