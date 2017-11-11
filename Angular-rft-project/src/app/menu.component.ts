import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private inGame: false;

  constructor() { }

  ngOnInit() {
  }

  logout(){
    if(localStorage.getItem('currentUser') != undefined)
      localStorage.removeItem('currentUser');
  }

}
