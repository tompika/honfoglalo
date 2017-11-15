import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class NewChatService {

  constructor(private socket: Socket) {
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

  addUser(username){
    this.socket.emit("adduser", username);
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

  getRandomQuestion() {
    return this.socket
      .fromEvent<any>("getrandomquestions")
      .map(data => data);
  }

  getsad(){
      this.socket.emit("getrandomquestions", {});
  }

  checkGameReady(){
    this.socket.emit("checkReadyGame",{});
  }

  game(){
    return this.socket
      .fromEvent<any>("game")
      .map(data => data);
  }



  close() {
    this.socket.disconnect()
  }
}
