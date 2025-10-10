import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseI } from 'app/models/response.interface';
import { BaseUrlService } from 'GlobalConstanst';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PruebasTytService {

  constructor(private http : HttpClient) { }

  consultarTyt (documento:number):Observable <ResponseI> {
    const direction = BaseUrlService.concat(`pruebaTyt/${documento}`)
    return this.http.get<ResponseI>(direction);
  }
}
