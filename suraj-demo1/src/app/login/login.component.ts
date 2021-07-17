import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { loginModel, loginResponse } from '../entities/LoginModel';
import { AuthGuardService } from '../services/auth-guard.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  empId: string;
  password: string;
  errorText: string;
  requestBody: loginModel;
  response: loginResponse;
  env = environment;
  constructor(
    private authService: AuthGuardService,
    private router: Router,
    private service: CommonService
  ) {
    this.requestBody = new loginModel();
  }

  ngOnInit(): void {
    //Dev Purpose
    if(!this.env.production){
    this.empId = 'raven@fgs.com';
    this.password = 'abc@123';
    }
  }

  onLogin() {
    if (this.validateLogin()) {
      this.requestBody.email = this.empId;
      this.requestBody.password = this.password;
      this.requestBody.oauth = this.service.Oauth;
      this.service.ToLogin(this.requestBody).subscribe((res) => {
        this.response = res;
        //console.log(this.response);
        if (this.response.returncode == 200) {
          this.service.isLoggedIn = true;
          localStorage.setItem('UserId', this.response.returndata.id);
          var loggedInName = `${this.response.returndata.firstname} ${this.response.returndata.lastname}`;
          localStorage.setItem('UserName', loggedInName);
          this.authService.login = true;
          this.router.navigateByUrl('Home');
        } else {
          this.errorText = 'Login Failed. Recheck Credentials';
        }
      });
    }
    // this.router.navigateByUrl('Home');
    // // this.authService.login = true;
    // // this.router.navigateByUrl('Home/Customer');
  }

  validateLogin(): boolean {
    if (!this.empId) {
      this.errorText = 'Kindly enter the Employee ID';
      return false;
    } else if (!this.password) {
      this.errorText = 'Kindly enter the password';
      return false;
    } else if (!this.empId && !this.password) {
      this.errorText = 'Enter credentials';
      return false;
    } else {
      this.errorText = '';
      return true;
    }
  }

}
