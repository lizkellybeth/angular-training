import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GitHubOrganization} from './git-hub-organization';
import {environment} from '../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class GitHubOrganizationsService {

    private organizationsUrl = environment.gitHubApiUrl + '/organizations-not-found?per_page=';

    static errorHandler( error: any ): void {
        console.error( '>>> Central error handling:', JSON.stringify( error ));
    }

    constructor( private httpClient: HttpClient ) {
    }

    /**
     * Perform an HTTP request to the 'organizations' endpoint of the GitHub API.
     *
     * @return  A Promise containing an array of GitHubOrganization instances
     *          if all went well; or 'undefined' if the HTTP request failed
     *          with an error.
     */
    fetchOrganizations( count: number,
                        catchErrors: boolean = true ): Promise< void | GitHubOrganization[] > {
        const promise = this.httpClient.get<GitHubOrganization[]>( this.organizationsUrl + count ).toPromise();
        return catchErrors
            ? promise.catch( GitHubOrganizationsService.errorHandler )
            : promise;
    }
}
