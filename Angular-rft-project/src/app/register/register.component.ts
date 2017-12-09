import { Component} from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  register() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
      data => {
        this.router.navigate(['/login']);
        this.alertService.success('Registration successful!', true);
      },
      error => {
        console.log(error._body);
        this.alertService.error(error._body);
        this.loading = false;
      });
  }
}
