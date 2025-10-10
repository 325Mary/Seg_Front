import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrlService } from 'GlobalConstanst';
import { ResponseI } from '../../models/response.interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  constructor(private http: HttpClient) { }

  getBitacorasTipo(tipo_seguimiento_id:any,asignacion_id:any):Observable<any>{
    let registro ={
      tipo_seguimiento_id,
      asignacion_id
    }
    let url = 'listTipoBitacoras'
    let direccion = BaseUrlService + url
    // return this.http.get<ResponseI>(direccion,registro)
    return this.http.post<ResponseI>(direccion,registro)
    .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }
  sendPost(documento:any, ruta:File,tipo_seguimiento_id:any,asignacion_id:any): Observable<any>{
    const fd = new FormData();
    fd.append('documento', documento);
    fd.append('ruta', ruta)
    fd.append('tipo_seguimiento_id',tipo_seguimiento_id)
    fd.append('asignacion_id',asignacion_id)
    
    let urlApi = 'bitacora';
    let direccion = BaseUrlService + urlApi 
    return  this.http.post<ResponseI>(direccion,fd)
  }
  cambiarEstado(asignacion_id:any,id_bitacora:any,estado_documento:any,tipo_seguimiento_id:any):Observable<any>{
    let registro={
      asignacion_id,
      id_bitacora,
      estado_documento,
      tipo_seguimiento_id
    }
    let url= 'cambiarEstado'
    let direccion = BaseUrlService + url
    return this.http.post<ResponseI>(direccion,registro)
  }
}
