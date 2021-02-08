import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Proposal} from './proposal';

@Injectable({
  providedIn: 'root'
})
export class ProposalsService {

  constructor( private httpClient: HttpClient ) {
  }

  fetchBProposals( cycle: string, callback: (data: Proposal[]) => void ): void {
    const url = environment.bibliographyServerUrl + '/proposals/' + cycle;
    this.httpClient.get<Proposal[]>( url )
        .toPromise()
        .then( data => callback( data ))
        .catch( error => console.error( JSON.stringify( error )));
  }
}
