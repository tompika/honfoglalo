import { Component, OnInit } from '@angular/core';
import { NewChatService } from '../_services/newchat.service';

import { User } from '../_models/user'

@Component({
  selector: 'app-newchat',
  templateUrl: './newchat.component.html',
  styleUrls: ['./newchat.component.css']
})
export class NewchatComponent implements OnInit {

  messages = [];
  questions = [];

  msg;
  question;

  private user: User;

  constructor(private _chatService : NewChatService) {
  }


  ngOnInit() {
      this._chatService
          .getMessage()
          .subscribe(msg => {
            this.messages.push(msg);
            console.log();
          });
          
          this.user = JSON.parse(localStorage.getItem('currentUser')) as User;
    }

    sendMsg(){
       this._chatService.sendMessage({from: this.user.username, text: this.msg});
       this.msg = '';
    }

}
