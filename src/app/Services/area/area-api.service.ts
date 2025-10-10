import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ResponseI } from '../../models/response.interface';
import { catchError } from "rxjs/operators";
import { BaseUrlService } from '../../../GlobalConstanst'//interface base url service



@Injectable({
  providedIn: 'root',
})
export class AreaApiService {



  constructor(private http: HttpClient) {}

  getAllAreas(): Observable<ResponseI> {
    let urlApi = 'seeareas';
    return this.http.get<ResponseI>(BaseUrlService + urlApi)
    .pipe(
      catchError(err => {
        // console.log("Ha ocurrido un error");
       return throwError(err);
      })
    );
  }
  getSingleArea(id_area:any): Observable<ResponseI> {
    let urlApi = "seearea/" + id_area;

    let direccion = BaseUrlService + urlApi
    return this.http.get<ResponseI>(direccion)
  }
}
