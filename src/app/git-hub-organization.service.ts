import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GitHubOrganization} from './git-hub-organization';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GitHubOrganizationService {

    constructor( private httpClient: HttpClient ) {
    }

    fetchOrganizations( count: number, callback: (data: GitHubOrganization[]) => void ): void {
        const url = environment.gitHubApiUrl + '/organizations?per_page=' + count;
        this.httpClient.get<GitHubOrganization[]>( url )
            .toPromise()
            .then( data => callback( data ))
            .catch( error => console.error( JSON.stringify( error )));
    }
}
