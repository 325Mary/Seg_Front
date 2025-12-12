import { Component, OnInit } from '@angular/core';
import { CiudadService, CudadService } from '../../../Services/Ciudad/cudad.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit {


  Ciudades: any
  constructor(private api: CiudadService, private route: Router) { }

  ngOnInit(): void {
    this.obtenerCiudad();
  }

  obtenerCiudad() {
    this.api.getCiudad().subscribe(data => {
      this.Ciudades = data.results
    })
  }

  deleteCiudad (id) {
console.log('Eliminar ciudad con ID:', id);
    Swal.fire({
      title: 'Estás seguro que deseas eliminar esta ciudad ?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText : 'Cancelar' , 
      confirmButtonColor : '#d41f1f'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteCiudad(id).subscribe(data => {
          if (data.status === 'success') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: "Ciudad Eliminada!",
              text: "Ciudad eliminada exitosamente",
              showConfirmButton: true,
            })
            this.obtenerCiudad()
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: "Error",
              text: "El Ciudad ya tiene aprendices asignados",
              showConfirmButton: true,
            })
          }
        });
      }
    })
  }

}
