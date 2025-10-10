import { data } from 'jquery';
import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import {Observable} from 'rxjs'
import {ResponseI} from '../../models/response.interface'
import { BaseUrlService } from '../../../GlobalConstanst'

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  constructor(private http :HttpClient){  }

  allPerfiles () :Observable<ResponseI>{
    let direction = BaseUrlService.concat('allPerfiles')
    return this.http.get<ResponseI>(direction)
  }

  gestionarPermisos (array : any ) {
    return new Promise(resolved  => {
      const dataroute = Object.values(array.data);
      const perfil_id = localStorage.getItem('perfil_id')
      const resultado = valor =>  valor == perfil_id
      const result = dataroute.some(resultado)
      resolved(result)
    })
  }
}
