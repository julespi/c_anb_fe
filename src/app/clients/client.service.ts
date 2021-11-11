import { Injectable } from '@angular/core';
import { Client } from './client'
import { CLIENTS } from './clientes.json'
import { Observable, of, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndpoint:string = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]>{
    //return of(CLIENTS);
    //return this.http.get<Client[]>(this.urlEndpoint)  es lo mismo que lo de abajo
    return this.http.get(this.urlEndpoint).pipe(
      map( response => response as Client[] )
    );
  }
}
