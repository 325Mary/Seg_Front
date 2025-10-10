import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { PerfilesService } from '../../../Services/perfiles/perfiles.service';
import { ItemModuloService } from '../../../Services/item_modulo/item-modulo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponentModulePermiss implements OnInit {

  Allperfiles: any[] = []

  Modulos: any[] = []

  editarForm = new FormGroup({
    //campos form
    item_modulo_id: new FormControl('', Validators.required),
    perfil_id: new FormControl('', Validators.required),
  })


  constructor(
    private servicePerfiles: PerfilesService,
    private serviceItemModulo: ItemModuloService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getAllPerfiles()
    this.getAllModules()
  }

  getAllPerfiles() {
    this.servicePerfiles.allPerfiles().subscribe(data =>{
      this.Allperfiles = data.results 
    })
  }

  getAllModules() {
    this.serviceItemModulo.getAllItemModules().subscribe(data => {
      this.Modulos = data.results
    })
  }

  PostForm (form : any ) {
    console.log(form)
    if (this.editarForm.valid) {
      this.serviceItemModulo.resgisterItemModulePerfil(form).subscribe(data => {
        if (data.status === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Usuario Actualizado!",
            text: "permisos agregados con exito",
            showConfirmButton: true,
          })
          this.router.navigate(['gestionar-roles'])
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
        text: "Todos los campos son obligatorios",
        showConfirmButton: true,
      })
    }
  }

}
