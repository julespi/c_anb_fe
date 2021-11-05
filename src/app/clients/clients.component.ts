import { Component, OnInit } from '@angular/core';
import { Client } from './client'

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [
    {
      "id": "61854cbb759295943167304f",
      "name": "French",
      "last_name": "Callahan",
      "email": "frenchcallahan@nimon.com",
      "created": "2018-06-05T05:08:48 +03:00"
    },
    {
      "id": "61854cbbdaf2b7148569bc59",
      "name": "Kristin",
      "last_name": "Oneill",
      "email": "kristinoneill@nimon.com",
      "created": "2018-11-27T03:29:01 +03:00"
    },
    {
      "id": "61854cbb5ffb1e1d4dd2f64b",
      "name": "Leach",
      "last_name": "Hopkins",
      "email": "leachhopkins@nimon.com",
      "created": "2014-05-25T07:32:42 +03:00"
    },
    {
      "id": "61854cbb529c423dde768d9e",
      "name": "Stacey",
      "last_name": "Robbins",
      "email": "staceyrobbins@nimon.com",
      "created": "2018-01-22T12:18:34 +03:00"
    },
    {
      "id": "61854cbb05876499d0035944",
      "name": "Edna",
      "last_name": "Avery",
      "email": "ednaavery@nimon.com",
      "created": "2018-04-05T04:48:19 +03:00"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
