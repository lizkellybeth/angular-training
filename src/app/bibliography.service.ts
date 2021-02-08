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
    fetchBibliography( count: any,
                       callback: (data: BibliographicRecord[]) => void,
                       errorCallback?: (x) => void ): void {
        const url = environment.bibliographyServerUrl + '/bibliography/' + count;
        this.httpClient.get<BibliographicRecord[]>(url)
            .toPromise()
            .then(data => callback(data))
            .catch(error =>
                    errorCallback
                        ? errorCallback(error)
                        : console.error(JSON.stringify(error)));
    }
}
