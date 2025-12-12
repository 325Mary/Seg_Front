import { Component, OnInit , Input  } from '@angular/core';
import {PhotosService} from '../../Services/photo/photos.service'
import {AprendizService} from '../../Services/aprendiz/aprendiz.service'
import { ListaUsers} from '../../models/users/user.interface'
import { data } from 'jquery';


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  dataMyProfile : ListaUsers
  bollId : any
  id_user : any 

  constructor(private photoService : PhotosService , private serviceAprendiz : AprendizService) { }

  ngOnInit(){
    this.id_user = sessionStorage.getItem('id_user')
    sessionStorage.getItem('id_aprendiz') == null ? this.bollId = true : this.bollId = false
    this.bollId == true ?  this.obtenerMyProfile() : this.getDataAprendiz()
    
  }

   obtenerMyProfile () {
     this.photoService.myprofile(this.id_user).subscribe(data => {
      this.dataMyProfile = data.results,
      console.log('Mi perfil:', this.dataMyProfile); 
    })
  }
  getDataAprendiz () {
      this.serviceAprendiz.getByIdAprendiz(sessionStorage.getItem('id_aprendiz')).subscribe(data => {
        this.dataMyProfile = data.results,
        console.log('Mi perfil:', this.dataMyProfile); 
      })
  }

}
