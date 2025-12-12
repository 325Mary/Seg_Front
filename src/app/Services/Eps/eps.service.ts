
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ListaUsers ,User } from '../../models/users/user.interface'
import { HttpClient , HttpHeaders} from '@angular/common/http'
import {ResponseI} from '../../models/response.interface'
import { BaseUrlService } from '../../../GlobalConstanst'

@Injectable({
  providedIn: 'root'
})
export class EpsService {

  token : any = sessionStorage.getItem('token');
   headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Bearer " + this.token
  })


  constructor(private http : HttpClient ) { }

  getEps(): Observable<ResponseI>{
    let direction : string = BaseUrlService + 'Eps'

    return this.http.get<ResponseI>(direction,{headers : this.headers})
  }

  getsimgleEps (id : any):Observable<ResponseI> {

    let direction = BaseUrlService + "/eps/" + id

    return this.http.get<ResponseI>(direction,{headers : this.headers})
  }

  putEps (form : User , id : any):Observable<ResponseI> {
      let direction = BaseUrlService + "eps/" + id
      const headers =  {
        Headers : new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : "Bearer " + this.token
        }),
        body : form
      }

    return this.http.put<ResponseI>(direction , form)
  }

  deleteEps (id:any) {
    
    let direction = BaseUrlService + "eps/" + id
    
    return this.http.delete<ResponseI>(direction)

  }

  postEps(form : User):Observable<ResponseI> {

    let direction = BaseUrlService + "Eps"
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
