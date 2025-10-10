import { Injectable, enableProdMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PerfilesService } from '../../Services/perfiles/perfiles.service';

@Injectable({
  providedIn: 'root'
})
export class GuardRolesGuard implements CanActivate {

  permiss: any


  constructor(
    private routes: Router,
    private perfilesServices: PerfilesService,
  ) { }

  async checkPermiss(route: ActivatedRouteSnapshot) {
    await this.perfilesServices.gestionarPermisos(route)
      .then(data => {
        this.permiss = data
        if (!data) {
          this.routes.navigate(['notFound'])
        }
      })
    return this.permiss
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const result = this.checkPermiss(route);
    return result
  }

}
