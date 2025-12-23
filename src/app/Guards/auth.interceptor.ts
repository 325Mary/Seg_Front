import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');
    const sessionId = sessionStorage.getItem('sessionId');
    const deviceFingerprint = sessionStorage.getItem('deviceFingerprint');

    if (token && !req.url.includes('/login')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'X-Session-Id': sessionId || '',
          'X-Device-Fingerprint': deviceFingerprint || ''
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          // Token inválido o sesión expirada
          sessionStorage.clear();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}