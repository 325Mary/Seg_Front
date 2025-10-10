import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ResponseI } from '../../models/response.interface';
import { Observable, throwError } from 'rxjs'
import {Aprendiz} from '../../models/Aprendiz/aprendiz'
import { Aprendiz_re_DTO } from '../../models/Aprendiz/aprendiz_RE_DTO';
import { BaseUrlService } from '../../../GlobalConstanst'//interface base url service
@Injectable({
  providedIn: 'root'
})
export class AprendizService {

  urlApi = 'aprendiz'
  urlAprendizREP = 'aprendiz_REP'
  urlPrograms = 'programs'
  urlAprendiz = "getByIdAprendiz"
  urlMunicipios = 'municipios'

  constructor(private http : HttpClient) { }

  getAprendices(): Observable<ResponseI>{
    let urlApi = 'aprendices'
    let direccion = BaseUrlService + urlApi
    return this.http.get<ResponseI>(direccion)
    .pipe(
      catchError(err => {
        // console.log("Error en el servidor");
      return throwError(err);
      })
    )
  }

  deleteAprendiz(id:string): Observable<ResponseI>{
    return this.http.delete<ResponseI>(BaseUrlService +  this.urlApi + '/' +  id)
    .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }

  saveAprendiz(aprendiz:Aprendiz): Observable<ResponseI>{
    return this.http.post<ResponseI>(BaseUrlService + this.urlApi , aprendiz )
    .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }

  getAprendiz(id:string): Observable<Aprendiz>{
    return this.http.get<Aprendiz>(BaseUrlService + this.urlApi + '/' + id)
    .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }

  editAprendiz(id:string, aprendiz:Aprendiz): Observable<Aprendiz>{
    return this.http.put<Aprendiz>(BaseUrlService + this.urlApi + '/' + id , aprendiz)
    .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }

    //save aprendiz y reporte etapa
  saveAprendizWithREP(aprendiz_RE_DTO:Aprendiz_re_DTO): Observable<ResponseI>{
    return this.http.post<ResponseI>(BaseUrlService + this.urlAprendizREP , aprendiz_RE_DTO )
    .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }

  deleteREPwithAprendiz(id:string): Observable<ResponseI>{
    return this.http.delete<ResponseI>(BaseUrlService+ this.urlAprendizREP + '/' + id)
    .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }
  getAprendizWithREP(id:string): Observable<any>{
    return this.http.get<any>(BaseUrlService+ this.urlAprendizREP + '/' + id)
    .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }
  editAprendizWithREP(id:string,aprendiz_RE_DTO:Aprendiz_re_DTO ):Observable<Aprendiz_re_DTO>{
    return this.http.put<Aprendiz_re_DTO>(BaseUrlService + this.urlAprendizREP + '/' + id, aprendiz_RE_DTO)
    .pipe(
      catchError(err=>{
        return throwError(err)
      })
    )
  }
  //list programs
  getPrograms():Observable<ResponseI>{
    return this.http.get<ResponseI>(BaseUrlService + this.urlPrograms)
    .pipe(
      catchError(err => {
        // console.log("Error en el servidor");
      return throwError(err);
      })
    )
  }

  //lista de municipios
  getMunicipios():Observable<ResponseI>{
    return this.http.get<ResponseI>(BaseUrlService + this.urlMunicipios)
      .pipe(
      catchError(err => {
        //console.log("Error en el servidor");
      return throwError(err);
      })
    )
  }
  //excel
  createDocuments ( documento:string, ruta: File) : Observable<ResponseI>{
    const fd = new FormData();

    fd.append('documento', documento);
    fd.append('ruta', ruta);
    let urlApi = 'importRegistro';
    let direccion = BaseUrlService + urlApi
    return this.http.post<ResponseI>(direccion,fd)
  }
  getDatosAprendiz(id: string):Observable<ResponseI>{
    let url = 'Aprendiz'
    
    
    return this.http.get<ResponseI>(BaseUrlService + url + '/' + id)
    .pipe(
      catchError(err => {
        // console.log("Error en el servidor");
      return throwError(err);
      })
    )
  }

  getByIdAprendiz (id ) : Observable<ResponseI> {

    const direction = BaseUrlService.concat(`getByIdAprendiz/${id}`)
    
    return  this.http.get<ResponseI>(direction)
  }
  //usuario aprendiz
  allAprendiz() : Observable<ResponseI> {
    let url ='aprendiz'
    return this.http.get<ResponseI>(BaseUrlService + url )
    .pipe(
      catchError(err => {
      return throwError(err);
      })
    )
  }

  aprendizByID(id:string): Observable<ResponseI>{
    return this.http.get<ResponseI>(BaseUrlService + this.urlApi + '/' + id)
    .pipe(
      catchError(err => {
        return throwError(err)
      })
    )
  }
  allFichasByInstructor(id_usuario:string):Observable<ResponseI>{
    let url = 'AllFichas'
    return this.http.get<ResponseI>(BaseUrlService + url + '/' + id_usuario)
  }
  allMysFichas(id_usuario:any, ficha:string):Observable<ResponseI>{
    let url = 'AllMysFichas'
    const body={
      ficha
    }    
    return this.http.post<ResponseI>(BaseUrlService + url + '/' + id_usuario ,body)
  }

  getProgramsByID(id_program :string ):Observable<ResponseI>{

    return this.http.get<ResponseI>(BaseUrlService.concat(`programs/${id_program}`))
    
  }

  getVerDetalleAprendiz(id: String):Observable<ResponseI>{
    return this.http.get<ResponseI>(BaseUrlService.concat(`getByIdAprendiz/${id}`))
  }
    getEtapaProductiva():Observable<ResponseI>{
      return this.http.get<ResponseI>(BaseUrlService.concat("etapaProductiva"))
    }

    getProgramaAprendiz():Observable<ResponseI>{
      return this.http.get<ResponseI>(BaseUrlService.concat(`programs`))
    }


}
