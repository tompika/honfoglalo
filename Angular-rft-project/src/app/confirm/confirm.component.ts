import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AuthenticationService, AlertService } from '../_services/index';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  private isActivated = false;

  model: any = {};

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService) {



  }
  

  ngOnInit() {

    var param = this.router.parseUrl(this.router.url).queryParams["token"];

    this.authenticationService.confirmToken(param)
      .subscribe(
      data => {
        this.alertService.error(JSON.parse(JSON.stringify(data || null )));

        //console.log("Data:" +  data);
        this.alertService.success("Sikeres aktiválás!");
        this.router.navigate(['/login']);
      },
      error => {

        this.alertService.error(error);
      });

  }

}
