import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { LoginService } from '../../Services/login/login.service'
import { CookieService } from 'ngx-cookie-service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('container') container: ElementRef;

  loading: any = true

  constructor(
    private api: LoginService,
    private router: Router, 
    private cookies: CookieService,
    private render2: Renderer2
  ) { }

  perfil: any[] = []

  contenedor: any

  erroStatus: boolean = false
  erroMsg: any = ""

  loginForm = new FormGroup({
    identificacion: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  loginFormAprendices = new FormGroup({
    identificacion: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.checkSessionStorage();
    this.preventBackButton();
  }

  preventBackButton() {
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', () => {
      window.history.pushState(null, '', window.location.href);
    });
  }

  async onLoginUser(form: any) {
    let formdefinitive = {
      identificacion: form.identificacion.toString(),
      password: form.password
    }
    this.api.loginByUser(formdefinitive).subscribe(data => {
      if (data.status == 'success') {
        this.loading = false
        sessionStorage.setItem('id_user', data.results.id) 
        sessionStorage.setItem('user_id_centro', data.results.id_centro_formacion) 
        sessionStorage.setItem('user_id_perfil', data.results.perfil_id) 
        this.redirectTo(data)
        this.getMyPerfiles(data.results.perfil_id)
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: "Error",
          text: data.message,
          showConfirmButton: true,
        })
      }
    })
  }

  onLoginAprendiz(form: any) {
    let formCompleted = {
      identificacion: form.identificacion.toString(),
      password: form.password
    }
    this.api.loginByAprendiz(formCompleted).subscribe(data => {
      if (data.status == 'success') {
        this.loading = false
        sessionStorage.setItem('id_aprendiz', data.results.id) 
        sessionStorage.setItem('id_asignacion', data.results.id_asignacion) 
        this.redirectTo(data)
        this.getMyPerfiles(data.results.perfil_id)
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: "Error",
          text: data.message,
          showConfirmButton: true,
        })
      }
    })
  }

  checkSessionStorage() {
    if (sessionStorage.getItem('token')) {
      this.router.navigate(['dashboard']);
    }
  }

  showPassword() { 
    const change = document.getElementById('password') as HTMLInputElement
    if (change.type === 'password') {
      change.type = 'text'
    } else {
      change.type = 'password'
    }
  }

  redirectTo(data) {
    sessionStorage.setItem('token', data.results.token) 
    sessionStorage.setItem('perfil_id', data.results.perfil_id) 
  }

  clickSignIn() {
    const container = this.container.nativeElement
    this.render2.removeClass(container, "right-panel-active")
  }

  clickSignUp() {
    const container = this.container.nativeElement
    this.render2.addClass(container, "right-panel-active")
  }

  async getMyPerfiles(idPerfil: number | string) {
    
    await this.api.getMyModulesByPerfil(idPerfil).subscribe(data => {
          console.log("data perfil", data);

      if (data.status == 'success') {
        sessionStorage.setItem('data_perfil', JSON.stringify(data.results))
        this.perfil = data.results
        this.getAllItemModule()
      }
    })
  }

  async getAllItemModule() {
    await this.api.getAllItemModule().subscribe(modules => {
      console.log("moduel",JSON.stringify(modules.results));
      
      sessionStorage.setItem('modules', JSON.stringify(modules.results))
      this.router.navigate(['dashboard'])
      this.loading = true
    })
  }
}