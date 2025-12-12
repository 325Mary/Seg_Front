import { ResponseI } from "../../models/response.interface";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError, Subject } from "rxjs";
import { BaseUrlService } from "../../../GlobalConstanst"; //interface base url service
import {
  AssignmentI,
  PostAssignmentI,
} from "../../models/Assignments/Assignment.interface";
import { AssignmentNovedad } from "../../models/Assignments/Assignment.interface";
import { catchError } from "rxjs";
import { tap } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class AssignmentService {
  urlNovedad = "novedad";
  token : any = sessionStorage.getItem('token');
   headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Bearer " + this.token
  })

  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }

  getAllAssignments(user_id_centro: string, user_id_perfil: string): Observable<ResponseI> {
    let urlApi = "seeassignments";
    const params = new HttpParams()
    .set('id_centro', user_id_centro)
    .set('id_perfil', user_id_perfil);

    let direccion = BaseUrlService + urlApi;

    return this.http.get<ResponseI>(direccion, { headers: this.headers, params: params });
  }

  getAssignment(id_asignacion: any): Observable<ResponseI> {
    let urlApi = "seeassignment/" + id_asignacion;

    let direccion = BaseUrlService + urlApi;

    return this.http.get<ResponseI>(direccion);
  }

  getMyAssignments(id_user: any): Observable<ResponseI> {
    let urlApi = "seemyassignment/" + id_user;

    let direccion = BaseUrlService + urlApi;

    return this.http.get<ResponseI>(direccion);
  }

  getDataForm(user_id_centro: string, user_id_perfil: string): Observable<ResponseI> {
    let urlApi = "createassignment";
  const params = new HttpParams()
    .set('id_centro', user_id_centro)
    .set('id_perfil', user_id_perfil);

    let direccion = BaseUrlService + urlApi;

    return this.http.get<ResponseI>(direccion, { headers: this.headers, params: params });
  }

  getAprendiz(id_aprendiz: any): Observable<ResponseI> {
    let urlApi = "aprendizById/" + id_aprendiz;

    let direccion = BaseUrlService + urlApi;

    return this.http.get<ResponseI>(direccion);
  }

  getVerifyAssigment(aprendiz_id: any): Observable<ResponseI> {
    let urlApi = "verifyassignment/" + aprendiz_id;
    let direccion = BaseUrlService + urlApi;

    return this.http.get<ResponseI>(direccion);
  }

  postAssignment(form: PostAssignmentI): Observable<ResponseI> {
    let urlApi = "storeassignment";

    let direccion = BaseUrlService + urlApi;

    return this.http.post<ResponseI>(direccion, form)
  }

  putAssignment(form: AssignmentI, id_asignacion): Observable<ResponseI> {
    let urlApi = "updateassignment/" + id_asignacion;

    let direccion = BaseUrlService + urlApi;

    return this.http.put<ResponseI>(direccion, form);
  }

  deleteAssignment(id: number) {
    let urlApi = "deleteassignment/";

    let direction = BaseUrlService + urlApi + id;

    return this.http.delete<ResponseI>(direction).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  listNovedades(): Observable<ResponseI> {
    return this.http.get<ResponseI>(BaseUrlService + this.urlNovedad).pipe(
      catchError((err) => {
        // console.log("Error en el servidor");
        return throwError(err);
      })
    );
  }
  saveNovedad(Novedad: AssignmentNovedad, id: number): Observable<ResponseI> {
    return this.http.post<ResponseI>(
      BaseUrlService + this.urlNovedad + "/" + id,
      Novedad
    );
  }
  verifyAprendiz(aprendiz_id: string): Observable<ResponseI> {
    let url = "verifyAprendiz";
    return this.http.get<ResponseI>(BaseUrlService + url + "/" + aprendiz_id);
  }
  filtarFecha(form:any): Observable<ResponseI> {
    let url = 'filtrarFecha'
    return this.http.post<ResponseI>(BaseUrlService + url, form )
  }

  changeStatusSeg1(
    estado_seguimiento: any,
    id_asignacion: any
  ): Observable<ResponseI> {
    let urlApi = "changeStatusSeg1";
    let direccion = BaseUrlService + urlApi;
    const body = {
      estado_seguimiento,
      id_asignacion,
    };

    return this.http.post<ResponseI>(direccion, body)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  changeStatusSeg2(
    estado_seguimiento: any,
    id_asignacion: any
  ): Observable<ResponseI> {
    let urlApi = "changeStatusSeg2";
    let direccion = BaseUrlService + urlApi;
    const body = {
      estado_seguimiento,
      id_asignacion,
    };

    return this.http.post<ResponseI>(direccion, body)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  changeStatusSeg3(
    estado_seguimiento: any,
    id_asignacion: any
  ): Observable<ResponseI> {
    let urlApi = "changeStatusSeg3";
    let direccion = BaseUrlService + urlApi;
    const body = {
      estado_seguimiento,
      id_asignacion,
    };

    return this.http.post<ResponseI>(direccion, body)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
}
