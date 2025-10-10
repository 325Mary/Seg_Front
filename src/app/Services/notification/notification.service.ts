import { ResponseI } from "../../models/response.interface";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { BaseUrlService } from "../../../GlobalConstanst"; //interface base url service
import { NotificationI } from "../../models/Notification/Notification.interface";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }

  getMyNotifications(id_user): Observable<ResponseI> {
    let urlApi = `misnotificaciones/${id_user}`;

    let direccion = BaseUrlService + urlApi;

    return this.http.get<ResponseI>(direccion);
  }

  changeStatusNotification(
    estado_notificacion: any,
    id_notificacion: any
  ): Observable<ResponseI> {
    let urlApi = "estadonotificacion";
    let direccion = BaseUrlService + urlApi;
    const body = {
      estado_notificacion,
      id_notificacion,
    };

    return this.http.post<ResponseI>(direccion, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  postNotification(body: any): Observable<ResponseI> {
    let urlApi = "createnotificacion";
    let direccion = BaseUrlService + urlApi;
    return this.http.post<ResponseI>(direccion, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
}
