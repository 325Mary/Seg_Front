import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit , Input} from '@angular/core';
import { LoginService } from '../../../Services/login/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mydataaprendiz',
  templateUrl: './mydataaprendiz.component.html',
  styleUrls: ['./mydataaprendiz.component.css']
})
export class MydataaprendizComponent implements OnInit {

  @Input() dataAprendiz : any

  Password : any 

  formChangesPaswordnew = new FormGroup({
    oldpassword: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
  })

  constructor(
    private loginService : LoginService,
    private router : Router,
  ) { }

  ngOnInit() {}

  cambiarPassword() {
    this.Password = this.Password == false ? true : false
    console.log(this.Password);
  }

  updatedPasword(form : any  ) {
    console.log(form);
  if (this.formChangesPaswordnew.valid) {
    this.loginService.changePasswordAprendiz(form , sessionStorage.getItem('id_aprendiz')).subscribe(data => {
      if (data.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Contraseña Actualizada!",
          text: "la Contraseña se cambio con exito",
          showConfirmButton: true,
        })
        this.Password = false
      } else {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: "Informacion Sobre el Cambio de la Contraseña ",
          text: data.message,
          showConfirmButton: true,
        })
      }
    })
  }else {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: "Info",
      text: "Todos los campos son obligatorios",
      showConfirmButton: true,
    })
  }
}
}
