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

  notReady(){
    this.socket.emit('notReady',{});
  }

  addUser(username){
    this.socket.emit("adduser", username);
  }

  getMatchResult() {
    return this.socket
      .fromEvent<any>("matchResult")
      .map(data => data);
  }
//itt belerakjuk a readylistbe a playert + lekérjuk a méretét
  setReadyCount(){
    return this.socket
      .fromEvent<any>("readyCount")
      .map(data => data);
  }

//itt nem rakjuk bele a playert a readylistbe csak lekérjuk a métetét
  getReadyCount(){
    return this.socket
      .fromEvent<any>("getreadycount")
      .map(data => data);
  }

  sendReadyCountRequest(){
    this.socket.emit('getreadycount',{});
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

  sendResult(stage,answer){
    this.socket.emit("sendresult",{stage:stage,answer:answer});
  }

  getResult(){
    return this.socket
      .fromEvent<any>("getresult")
      .map(data => data);
  }

  sendPreGameRequest(){
    this.socket.emit("sendpreset",{});
  }

  getPreGameRequest(){
    return this.socket
      .fromEvent<any>("getpreset")
      .map(data => data);
  }

  getFriends(username){
    this.socket.emit("getFriendList",username);
  }

  setFriends(){
    return this.socket
      .fromEvent<any>("setFriendList")
      .map(data => data);
  }

  game(){
    return this.socket
      .fromEvent<any>("game")
      .map(data => data);
  }

  sendFriendRequest(who,to){
    this.socket.emit("friendRequest",who,to);
  }

  removeFriendRequest(who,to){
    this.socket.emit("removeFriend",who,to);
  }

  inviteFriend(who,to){
    this.socket.emit("inviteFriend",who,to);
  }

  logout(){
    this.socket.emit("logout");
  }

  endGame(){
    this.socket.emit("endgame");
  }

  getInvite(){
    return this.socket
      .fromEvent<any>("getInvite")
      .map(data => data);
  }

  friendRequestError(){
    return this.socket
      .fromEvent<any>("addFriendError")
      .map(data => data);
  }

  inviteResponse(response,who){
    this.socket.emit("inviteResponse",response,who);
  }

  close() {
    this.socket.disconnect()
  }
}
