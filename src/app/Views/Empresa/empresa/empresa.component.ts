import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../../Services/Empresa/empresa.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {


  Empresas: any
  constructor(private api: EmpresaService, private route: Router) { }

  ngOnInit(): void {
    this.obtenerEmpresa();
  }

  obtenerEmpresa() {
    this.api.getEmpresa().subscribe(data => {
      this.Empresas = data.results
    })
  }

  deleteEmpresa (id) {
console.log('Eliminar Empresa con ID:', id);
    Swal.fire({
      title: 'Estás seguro que deseas eliminar esta Empresa ?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText : 'Cancelar' , 
      confirmButtonColor : '#d41f1f'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteEmpresa(id).subscribe(data => {
          if (data.status === 'success') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: "Empresa Eliminada!",
              text: "Empresa eliminada exitosamente",
              showConfirmButton: true,
            })
            this.obtenerEmpresa()
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: "Error",
              text: "El Empresa ya tiene aprendices asignados",
              showConfirmButton: true,
            })
          }
        });
      }
    })
  }

}
