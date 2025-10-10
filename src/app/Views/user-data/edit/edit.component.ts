import { Component, OnInit ,EventEmitter , Output } from '@angular/core';
import {PhotosService} from '../../../Services/photo/photos.service'
import {ActivatedRoute, Router} from '@angular/router'
import Swal from 'sweetalert2';
import {BaseUrlImages} from '../../../../GlobalConstanst';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  file : any
  photoSelected :any
  path : string
  id_user : any 
  id_aprendiz : any 
  @Output() pathEmiter = new EventEmitter<string>()

  constructor (
    private photoservice : PhotosService,
    private route : Router ,
    private activateRoute : ActivatedRoute) { }

  ngOnInit(): void { 
    this.id_user = localStorage.getItem('id_user') 
    this. id_aprendiz = localStorage.getItem('id_aprendiz') 
    this.obtenerMyphoto(this.id_user , this. id_aprendiz )
  }

  onPhotoSelected(event : any) :void{
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0]
      //images preview
      const  reader = new FileReader()
      reader.onload = e =>this.photoSelected = reader.result
      reader.readAsDataURL(this.file)
    }
  }

  uploadPhoto () : boolean{
    // console.log(this.file)
    this.photoservice.UploadPhoto("" , this.file , this.id_user , this.id_aprendiz)
    .subscribe(res=> {
      console.log(this.photoSelected)
      if (this.photoSelected == undefined ) {
          Swal.fire({
            icon : 'question' ,
            title : 'Cambios no detectados',
            text : 'si realizaste algun cambio?',
            showConfirmButton : true ,
            timer : 2000
          })
      }else{
        if(res.status == 'success'){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Imagen registrada con exito',
            showConfirmButton: false,
            timer: 1500
          })
          this.route.navigate(['user-data'])
        }else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title : res.message.original.detail || res.message ,
            showConfirmButton: true,
            // timer: 1500
          })
        }
      }
    }
    ,eror => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: eror,
        showConfirmButton: true,
        // timer: 1500
      })
    })
    return false
  }

  obtenerMyphoto(id_user  : any ,id_aprendiz : any  ) {
    let pathh :string
    let bodypath : string
    this.photoservice.dowloadOneImage(id_user ,id_aprendiz ).subscribe(data =>{
        if (data.status === 'success') {
        bodypath = data.results.path
        pathh = BaseUrlImages.concat(bodypath.substring(8))
        this.path = pathh
        }else {
          this.path = null
        }
    })
  }
  IrADataUser () {
    this.route.navigate(['user-data'])
  }
}
