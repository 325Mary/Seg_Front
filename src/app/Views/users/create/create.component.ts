import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../Services/Users/users.service'
import { PerfilesService } from '../../../Services/perfiles/perfiles.service'
import { AreaApiService } from '../../../Services/area/area-api.service'
import { Router, ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import Swal from 'sweetalert2';
import { max } from 'moment';
import { CentroFormacionService } from '../../../Services/CentroFormacion/centro-formacion.service';
import { u } from 'chart.js/dist/chunks/helpers.core';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponentUser implements OnInit {

  perfiles: any[] = []
  areas: any[] = []
   centros: any[] = []; 
  user_id_centro = sessionStorage.getItem("user_id_centro");
  user_id_perfil = sessionStorage.getItem("user_id_perfil");

  editarForm = new FormGroup({
    //campos form
    perfil_id:new  FormControl('', Validators.required ),
    // centro: new FormControl('', Validators.required),
    nombres: new FormControl('', [Validators.required , Validators.maxLength(25)]),
    apellidos: new FormControl('',  [Validators.required , Validators.maxLength(25)]),
    correo_institucional: new FormControl('', [Validators.required ,Validators.email] ),
    correo_alternativo: new FormControl('', [Validators.required ,Validators.email]),
    identificacion: new FormControl('', [Validators.required , Validators.max(10000000000)]),
    genero: new FormControl('', Validators.required),
    ciudad_residencia: new FormControl('', [Validators.required , Validators.maxLength(20)]),
    area_id: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
    id_centro_formacion: new FormControl('', Validators.required),
  })

  constructor(
    private api: UsersService,
    private servicesPerfiles: PerfilesService,
    private areaservices: AreaApiService,
    private centroService: CentroFormacionService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllPerfiles()
    this.getAllAreas()
    this.getAllCentros(); 
  }

  PostForm(form: any) {
     this.editarForm.markAllAsTouched();
console.log(this.editarForm.value);     
    if (this.editarForm.valid) {
      this.api.postUser(form).subscribe(data =>{
        if (data.status === 'success' ){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Usuario Registrado!",
            text : "Usuario registrado exitosamente",
            showConfirmButton: true,
          }) 
          this.router.navigate(['vistausuarios'])

        }else if (data.message.split('(')[1] == 'identificacion)=') {
          Swal.fire({
            position: 'center',
            icon: 'info',
            title: "identificacion duplicada!",
            text : "Ya exite un usuario con la misma identificacion ",
            showConfirmButton: true,
          }) 
        }
        else{
          Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Info' ,
            text : data.message|| "informacion no detectada",
            showConfirmButton: true,
          })
        }
    })
    }else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Info' ,
        text : "Por Favor llena todos los Correctamente",
        showConfirmButton: true,
      })
    }
  }

  getAllPerfiles() {
    this.servicesPerfiles.allPerfiles().subscribe(perfil => {
      this.perfiles = perfil.results.filter(perfil => perfil.id_perfil != 2 )
    })
  }

  getAllAreas() {
    this.areaservices.getAllAreas().subscribe(area => {
      this.areas = area.results
    })
  }
  getAllCentros() {
  this.centroService.getcentroFormacion(this.user_id_centro, this.user_id_perfil).subscribe((response: any) => {
    this.centros = response.results.filter(centro => centro.estado === true);
  });
}

}
