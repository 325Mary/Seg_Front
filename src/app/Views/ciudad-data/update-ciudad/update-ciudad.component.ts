import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadService } from '../../../Services/Ciudad/cudad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-ciudad',
  templateUrl: './update-ciudad.component.html',
  styleUrls: ['./update-ciudad.component.css']
})
export class UpdateCiudadComponent implements OnInit {

  data_ciudad: any = {};
  id_ciudad: any;
  departamentos: any[] = [];

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private api: CiudadService,
  ) {}

  editarForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    departamento_id: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.id_ciudad = this.activeroute.snapshot.paramMap.get('id');
    this.cargarDepartamentos();
    this.cargarDatosCiudad();
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

  cargarDatosCiudad(): void {
    this.api.getsimgleCiudad(this.id_ciudad).subscribe((data: any) => {
      console.log('Datos recibidos:', data);
      
      if (data.status === 'success' && data.results) {
        this.data_ciudad = data.results;
        
        // Cargar los datos en el formulario
        this.editarForm.patchValue({
          nombre: data.results.nombre || '',
          departamento_id: data.results.departamento_id || ''
        });
      }
    }, error => {
      console.error('Error al cargar datos:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los datos de la ciudad',
        showConfirmButton: true,
      });
    });
  }

  PostForm(form: any) {
    if (this.editarForm.valid) {
      this.api.putCiudad(form, this.id_ciudad).subscribe((data: any) => {
        if (data.status === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Ciudad Actualizada!",
            text: "Datos de la ciudad actualizados con éxito",
            showConfirmButton: true,
          });
          this.router.navigate(['/ciudad'])
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
        console.error('Error al actualizar:', error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar la ciudad',
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