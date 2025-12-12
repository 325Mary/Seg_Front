import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '../../../Services/Empresa/empresa.service';
import { CiudadService } from '../../../Services/Ciudad/cudad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent implements OnInit {

  data_empresa: any = {};
  id_empresa: any;
  ciudades: any[] = [];

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private api: EmpresaService,
    private ciudadService: CiudadService
  ) {}

  editarForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    nit_empresa: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    ciudad_id: new FormControl('', Validators.required),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    direccion: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    observacion: new FormControl('', Validators.maxLength(500))
  });

  ngOnInit(): void {
    this.id_empresa = this.activeroute.snapshot.paramMap.get('id');
    this.cargarCiudades();
    this.cargarDatosEmpresa();
  }

  cargarCiudades(): void {
    this.ciudadService.getCiudad().subscribe((data: any) => {
      console.log('Ciudades recibidas:', data);
      
      if (data.status === 'success' && data.results) {
        this.ciudades = data.results;
      }
    }, error => {
      console.error('Error al cargar ciudades:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar las ciudades',
        showConfirmButton: true,
      });
    });
  }

  cargarDatosEmpresa(): void {
    this.api.getsimgleEmpresa(this.id_empresa).subscribe((data: any) => {
      console.log('Datos recibidos:', data);
      
      if (data.status === 'success' && data.results) {
        this.data_empresa = data.results;
        
        // Cargar los datos en el formulario
        this.editarForm.patchValue({
          nombre: data.results.nombre || '',
          nit_empresa: data.results.nit_empresa || '',
          ciudad_id: data.results.ciudad_id || '',
          telefono: data.results.telefono || '',
          email: data.results.email || '',
          direccion: data.results.direccion || '',
          observacion: data.results.observacion || ''
        });
      }
    }, error => {
      console.error('Error al cargar datos:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los datos de la empresa',
        showConfirmButton: true,
      });
    });
  }

  PostForm(form: any) {
    if (this.editarForm.valid) {
      this.api.putEmpresa(form, this.id_empresa).subscribe((data: any) => {
        if (data.status === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Empresa Actualizada!",
            text: "Datos de la empresa actualizados con éxito",
            showConfirmButton: true,
          });
          this.router.navigate(['/empresa']);
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
          text: 'No se pudo actualizar la empresa',
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