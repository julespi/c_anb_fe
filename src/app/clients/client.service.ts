import { Injectable } from '@angular/core';
import { Client } from './client';
import { Observable, map, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private urlEndpoint: string = 'http://localhost:8080/api/clients';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getClients(): Observable<Client[]> {
    //return this.http.get<Client[]>(this.urlEndpoint)  es lo mismo que lo de abajo
    return this.http
      .get(this.urlEndpoint)
      .pipe(map((response: any) => response.payload as Client[]));
  }

  createClient(client: Client): Observable<Client> {
    return this.http
      .post(this.urlEndpoint, client, { headers: this.httpHeaders })
      .pipe(map((response: any) => response.payload as Client))
      .pipe(
        catchError((e) => {
          console.error(e.error.message);
          Swal.fire(e.error.message, e.error.payload, 'error');
          return throwError(() => new Error(e));
        })
      );
  }

  getClient(id: number): Observable<Client> {
    return this.http
      .get(`${this.urlEndpoint}/${id}`)
      .pipe(map((response: any) => response.payload as Client))
      .pipe(
        catchError((e) => {
          this.router.navigate(['/clients']);
          console.error(e.error.message);
          Swal.fire(e.error.message, e.error.payload, 'error');
          return throwError(() => new Error(e));
        })
      );
  }

  updateClient(client: Client): Observable<Client> {
    return this.http
      .put(`${this.urlEndpoint}/${client.id}`, client, {
        headers: this.httpHeaders,
      })
      .pipe(map((response: any) => response.payload as Client))
      .pipe(
        catchError((e) => {
          console.error(e.error.message);
          Swal.fire(e.error.message, e.error.payload, 'error');
          return throwError(() => new Error(e));
        })
      );
  }

  deleteClient(id: number): Observable<Client> {
    return this.http
      .delete(`${this.urlEndpoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(map((response: any) => response.payload as Client))
      .pipe(
        catchError((e) => {
          console.error(e.error.message);
          Swal.fire(e.error.message, e.error.payload, 'error');
          return throwError(() => new Error(e));
        })
      );
  }
}
