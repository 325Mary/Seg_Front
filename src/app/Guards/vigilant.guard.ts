import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class VigilantGuard implements CanActivate {
  constructor(private route: Router, private cookies: CookieService) {}
  
  acessToken: boolean = false
  
  redirectTo() {
    const token = sessionStorage.getItem('token');
    
    if (token === null || token === "" || token === undefined) {
      this.acessToken = false;
      
      sessionStorage.clear();
      
      this.route.navigate(['login']).then(() => {
        window.history.replaceState(null, '', '/login');
        window.history.pushState(null, '', '/login');
      });
    } else {
      this.acessToken = true;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.redirectTo()
    return this.acessToken
  }

}