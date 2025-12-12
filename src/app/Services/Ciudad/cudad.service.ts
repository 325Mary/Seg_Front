
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ListaUsers ,User } from '../../models/users/user.interface'
import { HttpClient , HttpHeaders} from '@angular/common/http'
import {ResponseI} from '../../models/response.interface'
import { BaseUrlService } from '../../../GlobalConstanst'

@Injectable({
  providedIn: 'root'
})
export class CudadService {

  constructor() { }
}

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  token : any = sessionStorage.getItem('token');
   headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Bearer " + this.token
  })


  constructor(private http : HttpClient ) { }

  getCiudad(): Observable<ResponseI>{
    let direction : string = BaseUrlService + 'ciudad'

    return this.http.get<ResponseI>(direction,{headers : this.headers})
  }

  getsimgleCiudad (id : any):Observable<ResponseI> {

    let direction = BaseUrlService + "/ciudad/" + id

    return this.http.get<ResponseI>(direction,{headers : this.headers})
  }

  putCiudad (form : User , id : any):Observable<ResponseI> {
      let direction = BaseUrlService + "ciudad/" + id
      const headers =  {
        Headers : new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : "Bearer " + this.token
        }),
        body : form
      }

    return this.http.put<ResponseI>(direction , form)
  }

  deleteCiudad (id:any) {
    
    let direction = BaseUrlService + "ciudad/" + id
    
    return this.http.delete<ResponseI>(direction)

  }

  postCiudad(form : User):Observable<ResponseI> {

    let direction = BaseUrlService + "ciudad"
    let opciones =  {
      Headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : "Bearer " +this.token
      }),
      body : form
    }

    return this.http.post<ResponseI>(direction , form)

  }
   getDepartamentos(): Observable<ResponseI>{
    let direction : string = BaseUrlService + 'departamento'

    return this.http.get<ResponseI>(direction,{headers : this.headers})
  }
}
