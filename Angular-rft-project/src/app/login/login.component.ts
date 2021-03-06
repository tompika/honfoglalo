import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../_services/alert.service';
import { NewChatService } from '../_services/newchat.service';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  user: User;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private chatService: NewChatService) { }

  ngOnInit() {
    // reset login status
    //this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {

    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
      data => {
        this.router.navigate(['/home']);
        console.log("Sikeres belepes!");
        this.alertService.success("Sikeres belepes!");
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.chatService.addUser(this.user.username);
        this.chatService.getFriends(this.user.username);
        this.loading = false;
      },
      error => {
        this.alertService.error(error._body);
        this.loading = false;
      });



  }
}
