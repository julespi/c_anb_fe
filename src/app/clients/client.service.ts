import { Injectable } from '@angular/core';
import { Client } from './client';
import { Observable, map, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private urlEndpoint: string = 'http://localhost:8080/api/clients';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getClients(page: number): Observable<any> {
    return this.http.get(this.urlEndpoint + '/page/' + page).pipe(
      map((response: any) => {
        (response.payload.content as Client[]).map((client) => {
          client.created = formatDate(
            client.created,
            'EEEE dd, MMMM, yyyy',
            'en-US'
          );
          return client;
        });
        return response.payload;
      })
    );
  }

  createClient(client: Client): Observable<Client> {
    return this.http
      .post(this.urlEndpoint, client, { headers: this.httpHeaders })
      .pipe(map((response: any) => response.payload as Client))
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(() => e);
          }
          console.error(e.error.message);
          Swal.fire(e.error.message, e.error.payload, 'error');
          return throwError(() => e);
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
          return throwError(() => new e());
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
          if (e.status == 400) {
            // BAD REQUEST
            return throwError(() => e);
          }
          console.error(e.error.message);
          Swal.fire(e.error.message, e.error.payload, 'error');
          return throwError(() => e);
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
          return throwError(() => e);
        })
      );
  }

  upload(file: File, id): Observable<Client>{
    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    return this.http.post(`${this.urlEndpoint}/upload`,formData)
      .pipe(map((response: any) => response.payload as Client))
      .pipe(
        catchError((e) => {
          console.error(e.error.message);
          Swal.fire(e.error.message, e.error.payload, 'error');
          return throwError(() => e);
        })

      );
  }
}
