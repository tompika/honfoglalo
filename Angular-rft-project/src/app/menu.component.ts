import { Component, OnInit } from '@angular/core';
import { NewChatService } from './_services/newchat.service';
import { AuthenticationService } from './_services/index';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private inGame: false;

  constructor(private _chatService: NewChatService,
              private AuthenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  logout(){
    this.AuthenticationService.logout();
  }

}
