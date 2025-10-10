import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BaseUrlService } from '../../../GlobalConstanst'; //interface base url service
import { catchError, } from 'rxjs';
import { ResponseI } from 'app/models/response.interface';
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  tipo = []

  constructor(private http: HttpClient) { }

  getFases(): Observable<ResponseI> {
    let url = 'allFases'
    return this.http.get<ResponseI>(BaseUrlService + url)
  }

}
