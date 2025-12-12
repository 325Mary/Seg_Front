import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EpsService } from '../../../Services/Eps/eps.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-editarr-eps',
  templateUrl: './editarr-eps.component.html',
  styleUrls: ['./editarr-eps.component.css']
})
export class EditarrEpsComponent implements OnInit {


  data_eps: any = {};
  id_eps: any;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private api: EpsService,
  ) {}

  editarForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    nit: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)])
  });

  ngOnInit(): void {
    this.id_eps = this.activeroute.snapshot.paramMap.get('id');
    this.cargarDatosEps();
  }

  cargarDatosEps(): void {
    this.api.getsimgleEps(this.id_eps).subscribe((data: any) => {
      console.log('Datos recibidos:', data);
      
      if (data.status === 'success' && data.results) {
        this.data_eps = data.results;
        
        // Cargar los datos en el formulario
        this.editarForm.patchValue({
          nombre: data.results.nombre || '',
          nit: data.results.nit || ''
        });
      }
    }, error => {
      console.error('Error al cargar datos:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los datos de la EPS',
        showConfirmButton: true,
      });
    });
  }

  PostForm(form: any) {
    if (this.editarForm.valid) {
      this.api.putEps(form, this.id_eps).subscribe((data: any) => {
        if (data.status === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "EPS Actualizada!",
            text: "Datos de la EPS actualizados con éxito",
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
        console.error('Error al actualizar:', error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar la EPS',
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