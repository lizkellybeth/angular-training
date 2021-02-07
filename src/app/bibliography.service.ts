import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BibliographicRecord} from './bibliographic-record';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BibliographyService {

    constructor( private httpClient: HttpClient ) {
    }

    /** Get a number of bibliographic records, pass them to a callback */
    fetchBibliography( count: number, callback: (data: BibliographicRecord[]) => void ): void {
        const url = environment.bibliographyServerUrl + '/bibliography/' + count;
        this.httpClient.get( url )
            .toPromise()
            .then( data => callback( data as BibliographicRecord[] ))
            .catch( error => console.error( JSON.stringify( error )));
    }
}
