import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpresaService } from '../../../Services/Empresa/empresa.service';
import { CiudadService } from '../../../Services/Ciudad/cudad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.css']
})
export class CrearEmpresaComponent implements OnInit {

  ciudades: any[] = [];

  constructor(
    private router: Router,
    private api: EmpresaService,
    private ciudadService: CiudadService
  ) {}

  crearForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    nit_empresa: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    ciudad_id: new FormControl('', Validators.required),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    direccion: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    observacion: new FormControl('', Validators.maxLength(500))
  });

  ngOnInit(): void {
    this.cargarCiudades();
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

  PostForm(form: any) {
    if (this.crearForm.valid) {
      this.api.postEmpresa(form).subscribe((data: any) => {
        if (data.status === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Empresa Creada!",
            text: "La empresa se ha creado exitosamente",
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
        console.error('Error al crear:', error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear la empresa',
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