import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {
  clients: Client[];

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clientService
        .getClients(page)
        .subscribe((response) => (this.clients = response.content as Client[]));
    });
  }

  public delete(client: Client): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(client.id).subscribe((response) => {
          this.clients = this.clients.filter((cli) => cli !== client);
          Swal.fire(
            'Deleted!',
            `Client ${client.name} has been deleted`,
            'success'
          );
        });
      }
    });
  }
}
