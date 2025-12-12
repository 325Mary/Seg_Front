import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CentroFormacionService } from '../../../Services/CentroFormacion/centro-formacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponentCentro implements OnInit {

  data_centro: any = {}
  centroId: any

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private api: CentroFormacionService,
  ) { }

  editarForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    codigo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    direccion: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    responsable: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    estado: new FormControl(true, Validators.required)
  })

  ngOnInit(): void {
    this.centroId = this.activeroute.snapshot.paramMap.get('id')
    this.cargarDatosCentro()
  }

  cargarDatosCentro(): void {
    this.api.getsimglecentroFormacion(this.centroId).subscribe((data: any) => {
      console.log('Datos recibidos:', data);
      
      // Los datos están en data.results, no en data directamente
      if (data.status === 'success' && data.results) {
        this.data_centro = data.results
        
        // Cargar los datos en el formulario
        this.editarForm.patchValue({
          nombre: data.results.nombre || '',
          codigo: data.results.codigo || '',
          direccion: data.results.direccion || '',
          telefono: data.results.telefono || '',
          email: data.results.email || '',
          responsable: data.results.responsable || '',
          estado: data.results.estado !== undefined ? data.results.estado : true
        })
      }
    }, error => {
      console.error('Error al cargar datos:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los datos del centro',
        showConfirmButton: true,
      })
    })
  }

  PostForm(form: any) {
    if (this.editarForm.valid) {
      this.api.putcentroFormacion(form, this.centroId).subscribe((data: any) => {
        if (data.status === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Centro Actualizado!",
            text: "Datos del centro actualizados con éxito",
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
        console.error('Error al actualizar:', error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el centro',
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