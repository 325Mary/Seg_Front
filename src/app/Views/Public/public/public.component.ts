import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AOS from 'aos';
import { ContactoService } from 'app/Services/contacto.service';
import {PruebasTytService} from 'app/Services/pruebasTyt/pruebas-tyt.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  contactoForm: FormGroup;
  tytForm: FormGroup;
  resConsulta: any;


  constructor(private fb: FormBuilder, private contactoService: ContactoService, private pruebasTytService:PruebasTytService) {
    this.contactoForm = this.fb.group({
      email: ['', [Validators.maxLength(25), Validators.required]],
      asunto: ['', [Validators.maxLength(25), Validators.required]],
      mensaje: ['', [Validators.maxLength(100), Validators.required]],
    })

    this.tytForm = this.fb.group({
      documento: ['', [Validators.maxLength(14), Validators.minLength(8), Validators.required]]
    })
  }

  ngOnInit(): void {
    AOS.init({
      duration: 2200,
    });
  }

  enviar() {
    const contacto = {
      email: this.contactoForm.get('email')?.value,
      mensaje: this.contactoForm.get('mensaje')?.value,
      asunto: this.contactoForm.get('asunto')?.value,
    }
    this.contactoService.enviarMensaje(contacto).subscribe((data: any) => {
      if (data.status == 'error') {
        Swal.fire({
          title: 'Error',
          text: data.message,
          icon: 'error',
        })
        this.contactoForm.reset();
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Mensaje enviado',
          text: 'Gracias por comunicarte con nosotros, en un corto tiempo daremos respuesta a tu mensaje',
          showConfirmButton: false,
        })
        this.contactoForm.reset();

      }

    })
    // fetch('https://formspree.io/f/mdorebqp', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json' // Cambié los dos puntos por igual
    //   },
    //   body: JSON.stringify(contacto) // Convertir el objeto a una cadena JSON
    // }).then(response => {
    //   if (response.ok) {
    //     this.contactoForm.reset();
    //     Swal.fire({
    //       title: 'Mensaje enviado',
    //       text: 'Gracias por comunicarte con nosotros, en un corto tiempo daremos respuesta a tu mensaje',
    //       icon: 'success',
    //     })
    //     // Aquí podrías realizar acciones adicionales después de enviar el formulario
    //   } else {
    //     Swal.fire({
    //       title: 'Error',
    //       text: 'Algo salio mal',
    //       icon: 'error',
    //     })
    //     this.contactoForm.reset();
    //   }
    // }).catch(error => {
    //   Swal.fire({
    //     title: 'Error',
    //     text: 'Algo salio mal, conectaté a internet',
    //     icon: 'error',
    //   })
    //   this.contactoForm.reset();
    // });
  }

  consultarTyt() {
    const documento = this.tytForm.get('documento')?.value
    this.resConsulta = this.pruebasTytService.consultarTyt(documento).subscribe((data: any) => {
      if (data.status == 'error') {
        Swal.fire({
          title: 'Error',
          text: data.message,
          icon: 'error',
        })
        this.tytForm.reset();
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Estás registrado',
          text: data.menssage,
          showConfirmButton: false,
        })
        this.tytForm.reset();
      }
    })
  }
}
