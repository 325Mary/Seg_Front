import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {  CookieService }from 'ngx-cookie-service'
import { Router }from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class VigilantGuard implements CanActivate {
  constructor( private route : Router , private cookies : CookieService ){}
    acessToken : boolean = false
  redirectTo() {
    if(localStorage.getItem('token') === null || localStorage.getItem('token') === ""){
      this.acessToken = false
      this.route.navigate(['login'])

    }else{
      this.acessToken = true
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.redirectTo()
    return this.acessToken
  }

}
