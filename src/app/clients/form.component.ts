import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public client: Client = new Client();
  public title: string = 'Create new client';

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {}

  public create(): void {
    this.clientService
      .createClient(this.client)
      .subscribe((response) => this.router.navigate(['/clients']));
  }
}
