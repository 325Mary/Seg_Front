import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UsersService } from '../../../Services/Users/users.service'
import { User } from '../../../models/users/user.interface'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import Swal from 'sweetalert2';
import { PerfilesService } from '../../../Services/perfiles/perfiles.service'
import { AreaApiService } from '../../../Services/area/area-api.service'

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponentUser implements OnInit {

  data_user: any
  userId: any

  perfiles: any[] = []
  areas: any[] = []

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private api: UsersService,
    private servicesPerfiles: PerfilesService,
    private areaservices: AreaApiService,
  ) { }

  editarForm = new FormGroup({
    //campos form
    perfil_id:new  FormControl('', Validators.required ),
    centro: new FormControl('',  Validators.required),
    nombres: new FormControl('', [Validators.required , Validators.maxLength(25)]),
    apellidos: new FormControl('',  [Validators.required , Validators.maxLength(25)]),
    correo_institucional: new FormControl('', [Validators.required ,Validators.email] ),
    correo_alternativo: new FormControl('', [Validators.required ,Validators.email]),
    identificacion: new FormControl('', [Validators.required , Validators.max(10000000000)]),
    genero: new FormControl('', Validators.required),
    ciudad_residencia: new FormControl('', [Validators.required , Validators.maxLength(20)]),
    area_id: new FormControl('', Validators.required),
    // contrasena: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.userId = this.activeroute.snapshot.paramMap.get('id')
    this.obtenerMyProfile()
    this.getAllPerfiles()
    this.getAllAreas()
  }
  obtenerMyProfile() {
    this.api.getsimgleUser(this.userId).subscribe(data => {
      this.data_user = data.results
      this.editarForm.setValue({
        "perfil_id": this.data_user.perfil_id,
        "centro": this.data_user.centro,
        "nombres": this.data_user.nombres,
        "apellidos": this.data_user.apellidos,
        "correo_institucional": this.data_user.correo_institucional,
        "correo_alternativo": this.data_user.correo_alternativo,
        "identificacion": this.data_user.identificacion,
        "genero": this.data_user.genero,
        "ciudad_residencia": this.data_user.ciudad_residencia,
        "area_id": this.data_user.area_id,
        // "contrasena":this.data_user.contrasena
      })
    })
  }

  PostForm(form: User) {
    if (this.editarForm.valid) {
      this.api.putUser(form, this.userId).subscribe(data => {
        if (data.status === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Usuario Actualizado!",
            text: "Datos de usuario actualizados con exito",
            showConfirmButton: true,
          })
          this.router.navigate(['vistausuarios'])
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: "Error",
            text: data.message,
            showConfirmButton: true,
          })
        }
      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: "Info",
        text: "Por Favor llena todos los Correctamente",
        showConfirmButton: true,
      })
    }
  }
  getAllPerfiles() {
    this.servicesPerfiles.allPerfiles().subscribe(perfil => {
      this.perfiles = perfil.results.filter(perfil => perfil.id_perfil != 2)
    })
  }
  getAllAreas() {
    this.areaservices.getAllAreas().subscribe(area => {
      this.areas = area.results
    })
  }
}