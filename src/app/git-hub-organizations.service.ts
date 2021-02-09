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

    fetchOrganizations( count: number,
                        callback: (data: GitHubOrganization[]) => void,
                        errorCallback?: (x) => void  ): void {
        // trigger a 404 Not Found error if count is undefined
        const url = count
            ? environment.gitHubApiUrl + '/organizations?per_page=' + count
            : environment.gitHubApiUrl + '/organizations/not-found';
        this.httpClient.get<GitHubOrganization[]>( url )
            .toPromise()
            .then(  data  => callback( data ))
            .catch( error =>
                errorCallback
                    ? errorCallback(error)
                    : console.error(JSON.stringify(error)));
    }
}
