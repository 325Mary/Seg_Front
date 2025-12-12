import { Component, OnInit, Output , Input } from '@angular/core';
import {Router} from '@angular/router'
import {PhotosService} from '../../../Services/photo/photos.service'
import {ListaUsers} from '../../../models/users/user.interface'
import {BaseUrlImages} from '../../../../GlobalConstanst';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  path : string
  @Output() dataUser 
  @Input() data_user_photo : ListaUsers

  id_user : any 
  id_aprendiz : any 


  constructor(private route : Router , private photoService : PhotosService) { }

  ngOnInit(): void {
    this.id_user = sessionStorage.getItem('id_user') 
    this. id_aprendiz = sessionStorage.getItem('id_aprendiz') 
    this.obtenerMyphoto(this.id_user , this. id_aprendiz )

   }

   obtenerMyphoto(id_user  : any ,id_aprendiz : any  ) {
    let pathh :string
    let bodypath : string
    this.photoService.dowloadOneImage(id_user ,id_aprendiz ).subscribe(data =>{
        if (data.status === 'success') {
        bodypath = data.results.path
        pathh = BaseUrlImages.concat(bodypath.substring(8))
        this.path = pathh
        }else {
          this.path = null
        }
    })
  }

  iredit() {
    this.route.navigate(['edit-data-user']);
  }

}
