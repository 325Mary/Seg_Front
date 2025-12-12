import { Component, OnInit } from '@angular/core';
import { CentroFormacionService } from '../../../Services/CentroFormacion/centro-formacion.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-centro-formacion',
  templateUrl: './centro-formacion.component.html',
  styleUrls: ['./centro-formacion.component.css']
})
export class CentroFormacionComponent implements OnInit {
  user_id_centro = sessionStorage.getItem("user_id_centro");
  user_id_perfil = sessionStorage.getItem("user_id_perfil");

  CentrosFormacion: any
  constructor(private api: CentroFormacionService, private route: Router) { }

  ngOnInit(): void {
    this.obtenerCentrosFormacion();
  }

  obtenerCentrosFormacion() {
    this.api.getcentroFormacion(this.user_id_centro, this.user_id_perfil).subscribe(data => {
      this.CentrosFormacion = data.results
    })
  }

  deleteCentro(id) {

    Swal.fire({
      title: 'Estás seguro que deseas eliminar este Centro de formación ?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText : 'Cancelar' , 
      confirmButtonColor : '#d41f1f'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.api.deletecentroFormacion(id).subscribe(data => {
          //  console.log(data);
          if (data.status === 'success') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: "Centro de formación Eliminado!",
              text: "Centro de formación eliminado exitosamente",
              showConfirmButton: true,
            })
            this.obtenerCentrosFormacion()
            //  this.route.navigate(['dashboard/viewCentrosFormacion'])
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: "Error",
              text: "El Centro de formación ya tiene aprendices asignados",
              showConfirmButton: true,
            })
          }
        });
      }
    })
  }

}
