import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CentroFormacionService } from '../../../Services/CentroFormacion/centro-formacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-centros',
  templateUrl: './create-centros.component.html',
  styleUrls: ['./create-centros.component.css']
})
export class CreateCentrosComponent implements OnInit {

  constructor(
    private router: Router,
    private api: CentroFormacionService,
  ) { }

 
crearForm!: FormGroup;

ngOnInit(): void {
  this.crearForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    codigo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    direccion: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    responsable: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    estado: new FormControl(true, Validators.required)
  });
}


  PostForm(form: any) {
    if (this.crearForm.valid) {
      this.api.postcentroFormacion(form).subscribe((data: any) => {
        if (data.status === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Centro Creado!",
            text: "Centro de formación creado con éxito",
            showConfirmButton: true,
          })
          this.router.navigate(['/centro-de-formacion'])
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: "Error",
            text: data.message,
            showConfirmButton: true,
          })
        }
      }, error => {
        console.error('Error al crear centro:', error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear el centro',
          showConfirmButton: true,
        })
      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: "Info",
        text: "Por favor llena todos los campos correctamente",
        showConfirmButton: true,
      })
    }
  }

}