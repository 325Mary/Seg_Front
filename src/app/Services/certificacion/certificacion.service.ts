import { Injectable } from '@angular/core';
import { BaseUrlService } from '../../../GlobalConstanst'//interface base url service
import { Observable, throwError } from 'rxjs'
import { ResponseI } from '../../models/response.interface';
import { catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CertificacionService {

  constructor(private http: HttpClient) { }

  getAllPorCertificar():Observable<ResponseI>{
    let url = 'allAprendicesPorCertificar'
    return this.http.get<ResponseI>(BaseUrlService + url)
    .pipe(
      catchError(err => {
        // console.log("Error en el servidor");
      return throwError(err);
      })
    )
  }
  sendFile(documento:any, ruta:File,requisito_id:any,asignacion_id:any):Observable<ResponseI>{
    let url = 'createDocCertificacion'
    const fd = new FormData();
    fd.append('documento', documento);
    fd.append('ruta', ruta)
    fd.append('requisito_id',requisito_id)
    fd.append('asignacion_id',asignacion_id)
    let direccion = BaseUrlService + url
    return this.http.post<ResponseI>(direccion,fd)
    .pipe(
      catchError(err => {
        // console.log("Error en el servidor");
      return throwError(err);
      })
    )
  }
  getDocumentos(requisito_id:any,asignacion_id:any):Observable<ResponseI>{
    let url ='allDocumentosByRequisitos'
    let body = {
      asignacion_id, requisito_id
    }
    return this.http.post<ResponseI>(BaseUrlService+ url,body)
    .pipe(
      catchError(err => {
        // console.log("Error en el servidor");
      return throwError(err);
      })
    )
  }
  cambiaEstado(requisito_id:any,id_documentos_cert:any,estado:any,asignacion_id:any):Observable<ResponseI>{
    let url = 'estadoDocumentosCert'
    let body={
      requisito_id, estado,asignacion_id
    }
    return this.http.post<ResponseI>(BaseUrlService + url + '/' + id_documentos_cert, body)
  }
  allrequisitos():Observable<ResponseI>{
    let url = 'allRequisitos'
    return this.http.get<ResponseI>(BaseUrlService + url)
    .pipe(
      catchError(err => {
        // console.log("Error en el servidor");
      return throwError(err);
      })
    )
  }
}
