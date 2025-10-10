import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseI } from 'app/models/response.interface';
import { BaseUrlService } from 'GlobalConstanst';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private http: HttpClient) { }

  enviarMensaje(mensaje): Observable<ResponseI> {
    let urlApi = 'mensaje';
    return this.http.post<ResponseI>(BaseUrlService + urlApi, mensaje)
    .pipe(
      catchError(err => {
       return throwError(err);
      })
    );
  }
}
