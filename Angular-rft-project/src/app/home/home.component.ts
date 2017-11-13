import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { NewChatService } from '../_services/newchat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;

  readyUserCount;


  constructor(private userService: UserService,
              private _chatService: NewChatService) {
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
    this._chatService.sendReady();

  }


}
