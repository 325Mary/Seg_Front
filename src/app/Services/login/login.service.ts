import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import {map, Observable ,of,Subject, tap} from 'rxjs'
import {ResponseI} from '../../models/response.interface'
import { BaseUrlService } from '../../../GlobalConstanst'
import { catchError ,throwError} from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http :HttpClient){  }
  url: string = BaseUrlService

  private __resfresPermisos$ = new Subject<void>()

  get resfresh$ () {
    return this.__resfresPermisos$
}

  loginByUser(form : any ):Observable<ResponseI>{
    let direction = this.url + "login"
    return this.http.post<ResponseI>(direction ,form)
    .pipe(tap(() => {
          console.log(form)

      this.__resfresPermisos$.next()
    }),catchError((err : any ) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "Error de servidor!",
        text: "Se ha producido un error",
        showConfirmButton: true,
      })
    return throwError(err);
    })
    )
  }

  loginByAprendiz(form : any) : Observable<ResponseI> {
    
    let direction = this.url + "loginAprendiz"

    return this.http.post<ResponseI>(direction , form)
    .pipe(tap(() => {
      this.__resfresPermisos$.next()
    }))
  }

  getMyModulesByPerfil (id_perfil : string |number):Observable<ResponseI> {

    let direction = BaseUrlService.concat(`itemModules/${id_perfil}`)

    return this.http.get<ResponseI>(direction)
  }


  getAllItemModule () :Observable <ResponseI> {

    let direction = BaseUrlService.concat(`allitemModules`)

    return this.http.get<ResponseI>(direction)
  }

  changePasswordUser (form : any , id_user : any  )  :Observable <ResponseI> {

    const direction = BaseUrlService.concat(`updatedPasswordUser/${id_user}`)

    return this.http.post<ResponseI>(direction , form)

  }

  changePasswordAprendiz (form : any , id_aprendiz : any  )  :Observable <ResponseI> {

    const direction = BaseUrlService.concat(`updatedPasswordAprendiz/${id_aprendiz}`)

    return this.http.post<ResponseI>(direction , form)

  }

   validateToken(): Observable<boolean> {
    const token = sessionStorage.getItem('token');
    
    if (!token) {
      return of(false);
    }

    const direction = this.url + "validateToken";
    
    return this.http.get<ResponseI>(direction).pipe(
      map(response => {
        return response.valid === true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  logout(): Observable<any> {
    sessionStorage.clear();
    return of(true);
  }
}
