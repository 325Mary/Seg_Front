import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrlService } from 'GlobalConstanst';
import { ResponseI } from '../models/response.interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {
  urlApi = 'seguimiento'
  constructor(private http: HttpClient) { }

  sendPost(documento:any, ruta:File,tipo_seguimiento_id:any,asignacion_id:any): Observable<any>{
    const fd = new FormData();
    fd.append('documento', documento);
    fd.append('ruta', ruta)
    fd.append('tipo_seguimiento_id',tipo_seguimiento_id)
    fd.append('asignacion_id',asignacion_id)
    
    let urlApi = 'seguimiento';
    let direccion = BaseUrlService + urlApi 
    return  this.http.post<ResponseI>(direccion,fd)
  }
  getSeguimiento():Observable<ResponseI>{
    return this.http.get<ResponseI>(BaseUrlService + this.urlApi)
    .pipe(
      catchError(err => {
        // console.log("Error en el servidor");
      return throwError(err);
      })
    )
  }
  getDocumentoSeguimiento(tipo_seguimiento_id:any,asignacion_id:any):Observable<any>{

    let registro ={
      tipo_seguimiento_id,
      asignacion_id
    }
    let urlApi = 'documentosSeguimiento';
    let direccion = BaseUrlService + urlApi

    return this.http.post<ResponseI>(direccion,registro)
    .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }
  cambiarEstado(id_seguimiento:number,estado_documento:string):Observable<any> {
    let urlApi = 'estadoDoc';
    let direccion = BaseUrlService + urlApi
    const body = {
      estado_documento,
      id_seguimiento
    }
    return this.http.post<ResponseI>(direccion ,body)
    .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }
  verifyBitacoras(id_asignacion: number):Observable<ResponseI> {
    let url = 'verifyBitacoras'
    return this.http.get<ResponseI>(BaseUrlService + url + '/' + id_asignacion)
  }
  verifyBitacorasTipo(asignacion_id:any, tipo_seguimiento_id:number):Observable<ResponseI>{
    let registro={
      asignacion_id,
      tipo_seguimiento_id
    }
    let url ='verificoBitacorasTipo'
    let direccion = BaseUrlService + url
    return this.http.post<ResponseI>(direccion,registro)
  }
  buscarUsuario(id:string):Observable<ResponseI>{
    let url = 'buscarUsuario'
    return this.http.get<ResponseI>(BaseUrlService + url + '/' + id)
     .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }
  segAprobados(id:string):Observable<ResponseI>{
    let url = `segAprobados/${id}`
    return this.http.get<ResponseI>(BaseUrlService + url)
     .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }
}
