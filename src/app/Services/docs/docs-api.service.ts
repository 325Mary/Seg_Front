// import { DocumentI } from './../../models/Documents/Document.interface';
import { ResponseI } from './../../models/response.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BaseUrlService } from '../../../GlobalConstanst'//interface base url service

@Injectable({
  providedIn: 'root',
})
export class DocsApiService {


  constructor(private http: HttpClient) {}

  createDocument(documento: string, ruta: File): Observable<ResponseI> {
    const fd = new FormData();

    fd.append('documento', documento);
    fd.append('ruta', ruta);
    let urlApi = 'uploadDocument';

    let direccion = BaseUrlService + urlApi;

    return this.http.post<ResponseI>(direccion, fd);
  }

  getAllDocuments():Observable<ResponseI>{
    let urlApi = 'seedocs';

    let direccion = BaseUrlService + urlApi;

    return this.http.get<ResponseI>(direccion)
  }

  getDocument(id_documento:any):Observable<ResponseI>{

    let urlApi = 'seedoc/' + id_documento;

    let direccion = BaseUrlService + urlApi;

    return this.http.get<ResponseI>(direccion);
  }
}
