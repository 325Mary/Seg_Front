import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EpsService } from '../../../Services/Eps/eps.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eps',
  templateUrl: './eps.component.html',
  styleUrls: ['./eps.component.css']
})
export class EpsComponent implements OnInit {

  Eps: any[] = [];

  constructor(
    private api: EpsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEps();
  }

  cargarEps(): void {
    this.api.getEps().subscribe((data: any) => {
      
      if (data.status === 'success' && data.results) {
        this.Eps = data.results;
      }
    }, error => {
      console.error('Error al cargar EPS:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar las EPS',
        showConfirmButton: true,
      });
    });
  }

  deleteEps(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteEps(id).subscribe((data: any) => {
          if (data.status === 'success') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Eliminada!',
              text: 'La EPS ha sido eliminada',
              showConfirmButton: true,
            });
            this.cargarEps();
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Error',
              text: data.message,
              showConfirmButton: true,
            });
          }
        }, error => {
          console.error('Error al eliminar:', error);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar la EPS',
            showConfirmButton: true,
          });
        });
      }
    });
  }

}