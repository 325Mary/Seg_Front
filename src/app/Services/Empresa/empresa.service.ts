
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ListaUsers ,User } from '../../models/users/user.interface'
import { HttpClient , HttpHeaders} from '@angular/common/http'
import {ResponseI} from '../../models/response.interface'
import { BaseUrlService } from '../../../GlobalConstanst'

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  token : any = sessionStorage.getItem('token');
   headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Bearer " + this.token
  })


  constructor(private http : HttpClient ) { }

  getEmpresa(): Observable<ResponseI>{
    let direction : string = BaseUrlService + 'empresa'

    return this.http.get<ResponseI>(direction,{headers : this.headers})
  }

  getsimgleEmpresa (id : any):Observable<ResponseI> {

    let direction = BaseUrlService + "/empresa/" + id

    return this.http.get<ResponseI>(direction,{headers : this.headers})
  }

  putEmpresa (form : User , id : any):Observable<ResponseI> {
      let direction = BaseUrlService + "empresa/" + id
      const headers =  {
        Headers : new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : "Bearer " + this.token
        }),
        body : form
      }

    return this.http.put<ResponseI>(direction , form)
  }

  deleteEmpresa (id:any) {
    
    let direction = BaseUrlService + "empresa/" + id
    
    return this.http.delete<ResponseI>(direction)

  }

  postEmpresa(form : User):Observable<ResponseI> {

    let direction = BaseUrlService + "empresa"
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
