import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class NewChatService {

    constructor(private socket: Socket) {
    console.log("NEW CHAT SERVICE CONST");
   }

    sendMessage(msg){
        this.socket.emit("add-message", msg);
    }

    sendAnswer(answer){
      this.socket.emit("send-answer",{from:'peti', btn_id: answer });
    }

    getMessage() {
        return this.socket
            .fromEvent<any>("message")
            .map( data => data );
    }

    getQuestion(){
      return this.socket
          .fromEvent<any>("question")
          .map( data => data );
    }

    close() {
     this.socket.disconnect()
   }
}
