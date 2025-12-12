import { Injectable, Output, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable, Subject, tap} from 'rxjs'
import {ResponseI} from '../../models/response.interface'
import { User } from '../../models/users/user.interface'
import {BaseUrlService } from '../../../GlobalConstanst'


@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  @Output() EmitThePaht = new EventEmitter<any>()
  private _resfresPath$ = new Subject<void>()

    id_user = sessionStorage.getItem('id_user')

  constructor(private http : HttpClient  ) { }

  get resfresh$ () {
      return this._resfresPath$
  }

  UploadPhoto (userName : string, photo : string , id_user: any , aprendiz_id : any ) :Observable<ResponseI> {
    // let id_user =  sessionStorage.getItem('id_user')
    // let aprendiz_id = sessionStorage.getItem('id_aprendiz')
    id_user == null ? id_user = '' : aprendiz_id = ''

    const data = new FormData()
    
    data.append("descripcion" ,userName )
    data.append("file" ,photo )
    data.append("id_user" ,id_user )
    data.append("aprendiz_id" ,aprendiz_id )
    
    let direction = BaseUrlService + 'photo'

    return this.http.post<ResponseI>(direction , data)
    .pipe(tap(() => {
      this._resfresPath$.next()
    }))
  }
  dowloadOneImage(id_userr : any , aprendiz_id : any ) : Observable<ResponseI>{
    id_userr == null ? id_userr = '' : aprendiz_id = ''

    let direction = BaseUrlService + 'oneImage' 
    const data = {
      user_id : id_userr ,
      aprendiz_id : aprendiz_id
    }

    return this.http.post<ResponseI>(direction , data )

  }
  myprofile(id_user : any ) : Observable<ResponseI> {
    let direction = BaseUrlService.concat(`viewUser/${id_user}`)
    return this.http.get<ResponseI>(direction)
  }

}

