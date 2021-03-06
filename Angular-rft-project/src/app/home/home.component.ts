import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { NewChatService } from '../_services/newchat.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Rx';
import { Invite } from '../_models/invite';
import { AlertService } from '../_services/alert.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  friendName: String;
  friends: Array<String> = [];
  readyUserCount = 0;
  game = false;
  invite: Invite;
  invites: Array<Invite> = [];
  readyClicked: boolean = false;
  notReadyClicked: boolean = false;
  constructor(private userService: UserService,
              private _chatService: NewChatService,
              private alertService: AlertService,
              private router: Router) {
              this._chatService.sendReadyCountRequest();


    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("Jelenlegi felhasznalo: "  + this.currentUser.username);




  }

  ngOnInit() {
    console.log('oninit');

    this._chatService
      .getInvite()
      .subscribe(invite =>{
        this.invite = new Invite();
        this.invite.who = invite.who;
        this.invite.to = invite.to;
        console.log('invite who: ' + this.invite.who + ' invite to: ' + this.invite.to);
        this.invites.push(this.invite);
        console.log('invites list size: ' + this.invites.length);
      });

    this._chatService
      .setFriends()
      .subscribe(result => {
        console.log(result);
        console.log('result lenght: ' + result.length);
        this.friends = result;
        console.log("friendlist: " + result + " size: " + this.friends.length);

      });

      this._chatService
        .getReadyCount()
        .subscribe(result => {
          this.readyUserCount = result;
          console.log("Varkozo jatekosok: " + result);
        });


        this._chatService
          .setReadyCount()
          .subscribe(result => {
            this.readyUserCount = result;
            console.log("Varkozo jatekosok: " + result);
          });

          this._chatService
            .friendRequestError()
            .subscribe(result => {
              console.log('fos');
              this.alertService.error("Nincs ilyen user");
            });

          this._chatService
            .game()
            .subscribe(game => {
              this.game = JSON.parse(game) as boolean;
              console.log('gameready: ' + this.game);
              if(this.game){
                this._chatService.getsad();
                this._chatService.sendPreGameRequest();
                this.router.navigate(['/game']);
              }
            });
//TODO logout
  }

  gameReady(){
    this.readyClicked = true;
    this.notReadyClicked = false;
    console.log("READY CLICK");

    this._chatService.sendReady();
    this._chatService.checkGameReady();

    console.log('user after: ' + JSON.parse(localStorage.getItem('currentUser')).username);

  }

  notReady(){
    this.readyClicked = false;
    this.notReadyClicked = true;
    this._chatService.notReady();
  }

  addFriend(){
    console.log('friendname: ' + this.friendName);
    this._chatService.sendFriendRequest(this.currentUser.username,this.friendName);
    this.friendName = "";
  }

  sendInvite(name){
    this._chatService.inviteFriend(this.currentUser.username,name);
    console.log("invite: " +name);
  }

  removeFriend(name){
    this._chatService.removeFriendRequest(this.currentUser.username,name);
    console.log("remove: " +name);
  }

  acceptInvite(who){
    console.log("accept: " + who);
    this._chatService.inviteResponse("accept",who);
  }

  declineInvite(who){
      console.log("decline: " + who);
      this.invites = this.invites.filter(e=>e.who != who);
      this._chatService.inviteResponse("decline",who);

  }




}
