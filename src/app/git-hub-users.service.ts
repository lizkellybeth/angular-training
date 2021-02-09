import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment.prod';
import {GitHubUser} from './git-hub-user';

@Injectable({
    providedIn: 'root'
})
export class GitHubUsersService {

    constructor( private httpClient: HttpClient ) {
    }

    fetchUsers( count: number, callback: (data: GitHubUser[]) => void ): void {
        const url = environment.gitHubApiUrl + '/users?per_page=' + count;
        this.httpClient.get<GitHubUser[]>( url )
            .toPromise()
            .then(  data  => callback( data ))
            .catch( error => console.error( JSON.stringify( error )));
    }
}
