import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EpsService } from '../../../Services/Eps/eps.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-eps',
  templateUrl: './crear-eps.component.html',
  styleUrls: ['./crear-eps.component.css']
})
export class CrearEpsComponent implements OnInit {

  constructor(
    private router: Router,
    private api: EpsService,
  ) {}

  crearForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    nit: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)])
  });

  ngOnInit(): void {
  }

  PostForm(form: any) {
    if (this.crearForm.valid) {
      this.api.postEps(form).subscribe((data: any) => {
        if (data.status === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "EPS Creada!",
            text: "La EPS se ha creado exitosamente",
            showConfirmButton: true,
          });
          this.router.navigate(['/eps']);
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: "Error",
            text: data.message,
            showConfirmButton: true,
          });
        }
      }, error => {
        console.error('Error al crear:', error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear la EPS',
          showConfirmButton: true,
        });
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: "Info",
        text: "Por favor llena todos los campos correctamente",
        showConfirmButton: true,
      });
    }
  }

}