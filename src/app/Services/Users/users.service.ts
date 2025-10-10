import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ListaUsers ,User } from '../../models/users/user.interface'
import { HttpClient , HttpHeaders} from '@angular/common/http'
import {ResponseI} from '../../models/response.interface'
import { BaseUrlService } from '../../../GlobalConstanst'//interface base url service
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  token : any = localStorage.getItem('token');
   headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Bearer " + this.token
  })


  constructor(private http : HttpClient ) { }

  getAllusers(): Observable<ResponseI>{
    let direction : string = BaseUrlService + 'allusers'

    return this.http.get<ResponseI>(direction,{headers : this.headers})
  }

  getsimgleUser (id : any):Observable<ResponseI> {

    let direction = BaseUrlService + "/viewUser/" + id

    return this.http.get<ResponseI>(direction,{headers : this.headers})
  }

  putUser (form : User , id : any):Observable<ResponseI> {
      let direction = BaseUrlService + "updateUser/" + id
      const headers =  {
        Headers : new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : "Bearer " + this.token
        }),
        body : form
      }

    return this.http.put<ResponseI>(direction , form)
  }

  deleteUser (id:any) {
    
    let direction = BaseUrlService + "deleteUser/" + id
    
    return this.http.delete<ResponseI>(direction)

  }

  postUser(form : User):Observable<ResponseI> {

    let direction = BaseUrlService + "createUser"
    let opciones =  {
      Headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : "Bearer " +this.token
      }),
      body : form
    }

    return this.http.post<ResponseI>(direction , form)

  }
  users():Observable<ResponseI> {
    let url = 'users'
    return this.http.get<ResponseI>(BaseUrlService + url )
  }
  filtrarUsuarios(form:any):Observable<ResponseI> {
    let url = 'filtrarUsers'
    return this.http.post<ResponseI>(BaseUrlService + url , form)
  }
  allUsersAdmins():Observable<ResponseI>{
  let url = 'perfilAdmins'
  return this.http.get<ResponseI>(BaseUrlService + url )
  }
}
