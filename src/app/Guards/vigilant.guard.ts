import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from '../Services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class VigilantGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const token = sessionStorage.getItem('token');
    const perfilId = sessionStorage.getItem('perfil_id');
    
    if (!token ||  !perfilId) {
      this.redirectToLogin();
      return of(false);
    }

    return this.loginService.validateToken().pipe(
      map(isValid => {
        if (isValid) {
          return true;
        } else {
          this.redirectToLogin();
          return false;
        }
      }),
      catchError(() => {
        this.redirectToLogin();
        return of(false);
      })
    );
  }

  private redirectToLogin(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}