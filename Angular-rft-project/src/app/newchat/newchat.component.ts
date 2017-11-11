import { Component, OnInit } from '@angular/core';
import { NewChatService } from '../_services/newchat.service';

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



  constructor(private _chatService : NewChatService) { }


  ngOnInit() {
      this._chatService
          .getMessage()
          .subscribe(msg => {
            this.messages.push(msg);
            console.log();
          });
    }

    sendMsg(){
       this._chatService.sendMessage({from: 'Peti', text: this.msg});
       this.msg = '';
    }

}
