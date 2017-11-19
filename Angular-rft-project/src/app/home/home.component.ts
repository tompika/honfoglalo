import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { NewChatService } from '../_services/newchat.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Rx';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;

  readyUserCount = 0;
  game = false;


  constructor(private userService: UserService,
              private _chatService: NewChatService,
              private router: Router) {
              this._chatService.sendReadyCountRequest();


    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("Jelenlegi felhasznalo: "  + this.currentUser.username);

  }

  ngOnInit() {


      this._chatService
        .getReadyCount()
        .subscribe(result => {
          this.readyUserCount = result;
          console.log("Varkozo jatekosok: " + result);
        });

  }

  gameReady(){
    console.log("READY CLICK");
    //console.log('user before: ' + JSON.parse(localStorage.getItem('currentUser')).username);
    this._chatService.sendReady();
    this._chatService
      .setReadyCount()
      .subscribe(result => {
        this.readyUserCount = result;
        console.log("Varkozo jatekosok: " + result);
      });
    //console.log('user before: ' + JSON.parse(localStorage.getItem('currentUser')).username);
    this._chatService.checkGameReady();
    //console.log('user before: ' + JSON.parse(localStorage.getItem('currentUser')).username);

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
    //console.log('user before: ' + JSON.parse(localStorage.getItem('currentUser')).username);

    console.log('user after: ' + JSON.parse(localStorage.getItem('currentUser')).username);

  }


}
