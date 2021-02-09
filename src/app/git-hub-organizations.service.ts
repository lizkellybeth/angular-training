import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GitHubOrganization} from './git-hub-organization';
import {environment} from '../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class GitHubOrganizationsService {

    constructor( private httpClient: HttpClient ) {
    }

    /**
     * @return  A Promise containing an array of GitHubOrganization instances
     *          if all went well, or nothing at all if the HTTP request failed with an error.
     */
    fetchOrganizations( count: number ): Promise< void | GitHubOrganization[] > {
        const url = environment.gitHubApiUrl + '/organizations?per_page=' + count;
        return this.httpClient.get<GitHubOrganization[]>( url )
            .toPromise()
            .catch( error => console.error( JSON.stringify( error )));
    }
}
