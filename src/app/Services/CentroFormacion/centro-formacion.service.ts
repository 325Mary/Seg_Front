import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ListaUsers ,User } from '../../models/users/user.interface'
import { HttpClient , HttpHeaders, HttpParams} from '@angular/common/http'
import {ResponseI} from '../../models/response.interface'
import { BaseUrlService } from '../../../GlobalConstanst'//interface base url service
@Injectable({
  providedIn: 'root'
})
export class CentroFormacionService {

  token : any = sessionStorage.getItem('token');
   headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Bearer " + this.token
  })


  constructor(private http : HttpClient ) { }

  getcentroFormacion(user_id_centro: string, user_id_perfil: string): Observable<ResponseI>{
    let direction : string = BaseUrlService + 'centroFormacion'

  const params = new HttpParams()
    .set('id_centro', user_id_centro)
    .set('id_perfil', user_id_perfil);

  return this.http.get<ResponseI>(direction, { headers: this.headers, params: params });
  }

  getsimglecentroFormacion (id : any):Observable<ResponseI> {

    let direction = BaseUrlService + "/centroFormacion/" + id

    return this.http.get<ResponseI>(direction,{headers : this.headers})
  }

  putcentroFormacion (form : User , id : any):Observable<ResponseI> {
      let direction = BaseUrlService + "centroFormacion/" + id
      const headers =  {
        Headers : new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : "Bearer " + this.token
        }),
        body : form
      }

    return this.http.put<ResponseI>(direction , form)
  }

  deletecentroFormacion (id:any) {
    
    let direction = BaseUrlService + "centroFormacion/" + id
    
    return this.http.delete<ResponseI>(direction)

  }

  postcentroFormacion(form : User):Observable<ResponseI> {

    let direction = BaseUrlService + "centroFormacion"
    let opciones =  {
      Headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : "Bearer " +this.token
      }),
      body : form
    }

    return this.http.post<ResponseI>(direction , form)

  }
}
