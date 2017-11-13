import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { Router } from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  messages = [];
    connection;
    message;

    private socket;

  constructor(
    private _router: Router) {
    }

  /*ngOnInit() {

    if (sessionStorage.getItem("userName") === null) {
      this._router.navigate(['chatreg']);
    }
  //  this.socket = io('http://localhost:8080');
  //  this.socket.on('updatechat', function(data) {
  //    this.conversation.push(data);
//    }.bind(this));
  }*/

  ngOnInit() {
  /*    this.connection = this._chatService.getMessages().subscribe(message => {
        this.messages.push(message);
      })
      console.log("chat comp init");*/
    }


  sendMessage(){
      //this._chatService.sendMessage(this.message);
      this.message = '';
    }



  keypressHandler(event) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
    //this._chatService.logout();
  }

}
