import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, Subject } from "rxjs";
import { BaseUrlService } from "../../../GlobalConstanst"; //interface base url service
import { ResponseI } from "../../models/response.interface";


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) {}

  
  sendEmail(form : any ): Observable<ResponseI> {

    let direccion = BaseUrlService.concat('sendEmail');

    return this.http.post<ResponseI>(direccion , form);
  }

  getDadataAprendiz(id_bitacora : any): Observable<ResponseI> {
    let direccion = BaseUrlService.concat(`consultSendEmail/${id_bitacora}`);
    return this.http.get<ResponseI>(direccion);
  }

  getseguimiento(id_asignacion : any): Observable<ResponseI> {
    let direccion = BaseUrlService.concat(`consultseguimientos/${id_asignacion}`);
    return this.http.get<ResponseI>(direccion);
  }




  
}
