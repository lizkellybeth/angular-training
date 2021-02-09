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
    errorMessage: string;

    static getMeaningfulMessage(error): string {
        return `${error.statusText} (${error.status}): ${error.message}`;
    }

    // Simple callback for putting up an alert message
    static alertErrorCallback( error ): void {
        alert( AppComponent.getMeaningfulMessage( error ));
    }

    // Closure callback to display the error message in the browser
    private getDisplayErrorCallback(): (x) => void {
        return (error) => {
            this.errorMessage = AppComponent.getMeaningfulMessage( error );
        };
    }

    constructor( private gitHubOrganizationsService: GitHubOrganizationsService,
                 private gitHubUsersService: GitHubUsersService ) {
    }

    ngOnInit(): void {

        const service = this.gitHubOrganizationsService;    // to avoid a 'line too long' lint warning

        // Call the organizations service three times with an undefined count (to trigger an error response),
        // passing (a) no error callback, (b) the alert callback and (c) the display error callback
        service.fetchOrganizations( undefined, this.organizationsCallbackClosure() );
        service.fetchOrganizations( undefined, this.organizationsCallbackClosure(), AppComponent.alertErrorCallback );
        service.fetchOrganizations( undefined, this.organizationsCallbackClosure(), this.getDisplayErrorCallback() );

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
