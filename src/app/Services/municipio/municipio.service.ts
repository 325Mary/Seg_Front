import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import {Observable ,Subject, tap} from 'rxjs'
import {ResponseI} from '../../models/response.interface'
import { BaseUrlService } from '../../../GlobalConstanst'
import { catchError ,throwError} from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  constructor(private http :HttpClient){  }

  getAllMunicipios () :Observable <ResponseI> {
    let direction = BaseUrlService.concat(`municipios`)
    return this.http.get<ResponseI>(direction)
  }

}
