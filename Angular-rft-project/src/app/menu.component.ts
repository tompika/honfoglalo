import { Component, OnInit } from '@angular/core';
import { NewChatService } from './_services/newchat.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private inGame: false;

  constructor(private _chatService: NewChatService) { }

  ngOnInit() {
  }

  logout(){
    if(localStorage.getItem('currentUser') != undefined)
      this._chatService.logout();
      localStorage.removeItem('currentUser');
  }

}
