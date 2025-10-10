import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import {Observable ,Subject, tap} from 'rxjs'
import {ResponseI} from '../../models/response.interface'
import { BaseUrlService } from '../../../GlobalConstanst'

@Injectable({
  providedIn: 'root'
})
export class ItemModuloService {

  constructor(private http :HttpClient){  }


  getAllItemModulePerfil () :Observable <ResponseI> {
    let direction = BaseUrlService.concat(`all_modules_perfiles`)
    return this.http.get<ResponseI>(direction)
  }


  getAllItemModules () :Observable <ResponseI> {
    let direction = BaseUrlService.concat(`allItemModeles`)
    return this.http.get<ResponseI>(direction)
  }


  resgisterItemModulePerfil (form : any ) :Observable <ResponseI> {
    let direction = BaseUrlService.concat(`createItemModules`)
    return this.http.post<ResponseI>(direction , form)
  }

  deleteItemModulePerfil (id_item_modulo_perfil : any ) :Observable <ResponseI> {
    let direction = BaseUrlService.concat(`deleteModulePerfiles/${id_item_modulo_perfil}`)
    return this.http.delete<ResponseI>(direction)
  }


}
