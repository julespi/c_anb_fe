import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from './client';
import { ClientService } from './client.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public client: Client = new Client();
  public title: string = 'Create new client';

  constructor(
    private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clientService
          .getClient(id)
          .subscribe((client) => (this.client = client));
      }
    });
  }

  public create(): void {
    this.clientService.createClient(this.client).subscribe((response) => {
      this.router.navigate(['/clients']);
      swal.fire(
        'Success!',
        `Client ${response.name} created successfully`,
        'success'
      );
    });
  }

  public update(): void {
    this.clientService.updateClient(this.client).subscribe((client) => {
      this.client = client;
      this.router.navigate(['/clients']);
      swal.fire(
        'Success!',
        `Client ${client.name} updated successfully`,
        'success'
      );
    });
  }

  public cancel(): void {
    this.router.navigate(['/clients']);
  }
}
