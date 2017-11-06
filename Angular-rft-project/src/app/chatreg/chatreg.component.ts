import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as io from 'socket.io-client';

@Component({
  selector: 'app-chatreg',
  templateUrl: './chatreg.component.html',
  styleUrls: ['./chatreg.component.css']
})
export class ChatregComponent implements OnInit {
  userName = '';
  socket = null;

  constructor(
    private _router: Router) { }

  ngOnInit() {
    this.socket = io('http://localhost:8080');
  }

  login() {
    if (this.userName !== null) {
      sessionStorage.setItem("userName", this.userName);
      this._router.navigate(['game']);

      this.socket.on('connect', function() {
        // call the server-side function 'adduser' and send one parameter (value of prompt)
        console.log("Bejelentkezett user: " + this.userName);
        this.socket.emit('adduser', this.userName);


      });


    }
  }

  keypressHandler(event) {
    if (event.keyCode === 13) {
      this.login();
    }
  }
}
