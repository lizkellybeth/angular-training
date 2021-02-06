import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Bibliography} from './bibliography';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BibliographyService {

    constructor( private httpClient: HttpClient ) { }

    /** Get a number of bibliography entries */
    fetchBibliography( count: number, callback: (data: Bibliography) => void ): void {
        const url = environment.bibliographyServerUrl + '/bibliography/' + count;
        this.httpClient.get( url )
            .toPromise()
            .then( data => callback( data as Bibliography ))
            .catch( error => console.error( JSON.stringify( error )));
    }
}
