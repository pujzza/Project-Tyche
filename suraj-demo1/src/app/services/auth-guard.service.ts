import { CommonService } from 'src/app/services/common.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  login = false;
  userRole = 0;
  constructor(public router: Router,private service: CommonService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.service.isLoggedIn) {
      return true;  
    } else {
      this.router.navigate(['Login']);
      return false;  
    }
  }
}
