import { Component, OnInit } from '@angular/core';
import { NewChatService } from '../_services/newchat.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  
  readyusers;

  constructor(private _chatService : NewChatService) { }

  ngOnInit() {
    
      //this.readyusers = this._chatService.readyPlayes();
      this.readyusers = 4;
      console.log('log' + this.readyusers);
    
  }
    
    
    
    ready(){
       this._chatService.ready();
    }
  
}
