import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadService } from '../../../Services/Ciudad/cudad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-created-ciudad',
  templateUrl: './created-ciudad.component.html',
  styleUrls: ['./created-ciudad.component.css']
})
export class CreatedCiudadComponent implements OnInit {

  departamentos: any[] = [];

  constructor(
    private router: Router,
    private api: CiudadService,
  ) {}

  crearForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    departamento_id: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.cargarDepartamentos();
  }

  cargarDepartamentos(): void {
    this.api.getDepartamentos().subscribe((data: any) => {
      console.log('Departamentos recibidos:', data);
      
      if (data.status === 'success' && data.results) {
        this.departamentos = data.results;
      }
    }, error => {
      console.error('Error al cargar departamentos:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los departamentos',
        showConfirmButton: true,
      });
    });
  }

  PostForm(form: any) {
    if (this.crearForm.valid) {
      this.api.postCiudad(form).subscribe((data: any) => {
        if (data.status === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Ciudad Creada!",
            text: "La ciudad se ha creado exitosamente",
            showConfirmButton: true,
          });
          this.router.navigate(['/ciudad']);
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
          text: 'No se pudo crear la ciudad',
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