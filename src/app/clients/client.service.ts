import { Injectable } from '@angular/core';
import { Client } from './client';
import { CLIENTS } from './clientes.json';
import { Observable, of, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private urlEndpoint: string = 'http://localhost:8080/api/clients';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    //return this.http.get<Client[]>(this.urlEndpoint)  es lo mismo que lo de abajo
    return this.http
      .get(this.urlEndpoint)
      .pipe(map((response) => response as Client[]));
  }

  createClient(client: Client): Observable<Client> {
    return this.http
      .post(this.urlEndpoint, client, { headers: this.httpHeaders })
      .pipe(map((response) => response as Client));
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.urlEndpoint}/${id}`);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.urlEndpoint}/${client.id}`, client, {
      headers: this.httpHeaders,
    });
  }

  deleteClient(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.urlEndpoint}/${id}`, {
      headers: this.httpHeaders,
    });
  }
}
