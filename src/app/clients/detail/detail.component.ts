import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'client-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  client: Client;
  title: string = "Client Details";
  selectedFile: File;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id:number = +params.get('id');
      if(id){
        this.clientService.getClient(id).subscribe(client => {
          this.client = client;
        })
      }
    })

  }
  
  public selectFile(event){
    this.selectedFile = event.target.files[0];
  }

  public uploadFile(){
    console.log(this.selectedFile);
    this.clientService.upload(this.selectedFile, this.client.id).subscribe(
      client => {
        this.client = client;
        Swal.fire(
          'Uploaded!',
          `File ${this.selectedFile.name} has successfully been uploaded.`,
          'success'
        );
      }
    )
  }

}
