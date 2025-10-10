import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../Services/Users/users.service'
import { Router } from '@angular/router'
import Swal from 'sweetalert2';



@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit {

  users: any
  constructor(private api: UsersService, private route: Router) { }

  ngOnInit(): void {
    this.obtenerUsers();
  }

  obtenerUsers() {
    this.api.getAllusers().subscribe(data => {
      this.users = data.results
    })
  }

  deleteUser(id) {

    Swal.fire({
      title: 'Estás seguro que deseas eliminar este usuario ?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText : 'Cancelar' , 
      confirmButtonColor : '#d41f1f'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.api.deleteUser(id).subscribe(data => {
          //  console.log(data);
          if (data.status === 'success') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: "Usuario Eliminado!",
              text: "Usuario eliminado exitosamente",
              showConfirmButton: true,
            })
            this.obtenerUsers()
            //  this.route.navigate(['dashboard/viewusers'])
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: "Error",
              text: "El usuario ya tiene aprendices asignados",
              showConfirmButton: true,
            })
          }
        });
      }
    })
  }

}
