import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GitHubOrganization} from './git-hub-organization';
import {environment} from '../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class GitHubOrganizationsService {

    // This URL will always cause a '404 Not Found' error
    private organizations404Url = environment.gitHubApiUrl + '/organizations/not-found?per_page=';

    static errorHandler( error: any ): void {
        console.error( '>>> Central error handling:', JSON.stringify( error ));
    }

    constructor( private httpClient: HttpClient ) {
    }

    fetchOrganizations1(count: number ): Promise< void | GitHubOrganization[] > {
        return this.httpClient
            .get<GitHubOrganization[]>( this.organizations404Url + count )
            .toPromise();
    }

    fetchOrganizations2(count: number ): Promise< void | GitHubOrganization[] > {
        return this.httpClient
            .get<GitHubOrganization[]>( this.organizations404Url + count )
            .toPromise()
            .catch( GitHubOrganizationsService.errorHandler );
    }

    fetchOrganizations3(count: number,
                        catchErrors: boolean = true ): Promise< void | GitHubOrganization[] > {
        const promise = this.httpClient.get<GitHubOrganization[]>( this.organizations404Url + count ).toPromise();
        return catchErrors
            ? promise.catch( GitHubOrganizationsService.errorHandler )
            : promise;
    }
}
