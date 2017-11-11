import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';


@Injectable()
export class ChatService {
  private url = 'http://localhost:8080';
  private socket;

  private isConnected;

  private l_userName = "";

  constructor() {
/*

      this.socket = io.connect('http://localhost:8080');
      this.socket.on('connect', function() {
        // call the server-side function 'adduser' and send one parameter (value of prompt)
        this.l_userName = prompt("Hogy hívnak?");

        localStorage.setItem('chatUserName', this.l_userNam);

        console.log(this.l_userName);

      });
      console.log("SERVICE CONST");*/
    }


  logout(){
    this.socket.emit('disconnect');
  }

  getAnswer(){

    this.socket.emit('get-answer');
  }


  sendMessage(message) {
    if (message != '') {
      console.log(message);
      this.socket.emit('add-message', { from: 'Peti', text: message });
    }
  }

  sendValasz(btn_id) {
    this.socket.emit('send-answer', { from: 'Peti', btn_id: btn_id });
  }

  getMessages() {
  /*  let observable = new Observable(observer => {
      //this.socket = io('http://localhost:8080');
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;*/
  }

  getQuestion(){
  /*  let observable = new Observable(observer => {
      //this.socket = io('http://localhost:8080');
      this.socket.on('send_answer', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;*/
  }

}
