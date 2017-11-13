import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class NewChatService {

  constructor(private socket: Socket) {
    console.log("NEW CHAT SERVICE CONST");
  }

  sendMessage(msg) {
    this.socket.emit("add-message", msg);
  }

  sendAnswer(answer) {
    this.socket.emit("answer", { from: localStorage.getItem('currentUser'), btn_id: answer });
  }

  sendReady(){
    this.socket.emit("ready", {});
  }

  getMatchResult() {
    return this.socket
      .fromEvent<any>("matchResult")
      .map(data => data);
  }

  getReadyCount(){
    return this.socket
      .fromEvent<any>("readyCount")
      .map(data => data);
  }

  getAnswerResult() {
    return this.socket
      .fromEvent<any>("answerResult")
      .map(data => data);
  }

  getMessage() {
    return this.socket
      .fromEvent<any>("message")
      .map(data => data);
  }

  getQuestion() {
    return this.socket
      .fromEvent<any>("question")
      .map(data => data);
  }

  close() {
    this.socket.disconnect()
  }
}
