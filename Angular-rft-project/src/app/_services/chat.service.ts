import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  private url = 'http://localhost:8080';
  private socket;

  private l_userName = "";

  constructor() {
    this.socket = io.connect('http://localhost:8080');

    this.socket.on('connect', function() {
      // call the server-side function 'adduser' and send one parameter (value of prompt)
      this.l_userName = prompt("Hogy hívnak dylym?");

      console.log(this.l_userName);
      this.socket.emit('adduser', this.l_userName);
/*
      this.socket.on('user_dc', function(data) {
        this.lelepett = data;
      }.bind(this));

*/

    });
    console.log("SERVICE CONST");
  }



  sendMessage(message) {
    if( message != ''){
      this.socket.emit('add-message', {from:'petike', text: message});
    }
  }

  sendValasz(btn_id){
    console.log("KAPOTT BTN ID: " + btn_id);
    this.socket.emit('send-answer', {from: 'petike', btn_id: btn_id});
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io('http://localhost:8080');
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

}
