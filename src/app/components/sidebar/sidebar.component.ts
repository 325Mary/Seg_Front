import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
import { Subscription } from 'rxjs';
import { LoginService } from '../../Services/login/login.service'
import { BaseUrlImages } from '../../../GlobalConstanst'
import { NotificationService } from "../../Services/notification/notification.service";
import { NotificationI } from "./../../models/Notification/Notification.interface";
import { PhotosService } from '../../Services/photo/photos.service'
import {AprendizService} from '../../Services/aprendiz/aprendiz.service'
import Swal from "sweetalert2";


declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export let ROUTES: RouteInfo[] = [
  // { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
  // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
  // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
  // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
  // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
  // { path: '/list-assignments', title: 'Asignaciones',  icon:'fact_check', class: '' },
  // { path: '/list-my-assignments', title: 'Mis Asignaciones',  icon:'fact_check', class: '' },
  // { path: '/list-aprendices', title: 'Aprendices', icon:'wc', class: ''},
  // { path: '/vistausuarios', title: 'Usuarios', icon:'person', class: ''},
  // { path: '/view-documets', title: 'Documentos', icon:'description', class: ''},
  // { path: '/create-document', title: 'Subir Documento', icon:'post_add', class: ''},
  // { path: '/lista-aprendices-por-certificar', title: 'Aprendices por Certificar', icon:'rule_folder', class:''},
  // { path: '/reporte-aprendices', title:'Reportes Aprendices', icon: 'bar_chart', class: ''},
  // { path: '/reporte-usuarios' , title:'Reportes Usuarios', icon: 'bar_chart', class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  id_user = localStorage.getItem('id_user');
  dataperfiles: any = JSON.parse(localStorage.getItem('data_perfil'))
  menuItems: any[];
  path: string
  subscription: Subscription
  subscriptionPermisos: Subscription
  subscriptionNoti:Subscription
  notifications: NotificationI[];
  countNofications: number = 0;
  pageActual: number = 1;

  id_aprendiz = localStorage.getItem('id_aprendiz')

  dataMyProfile : any 
  bollId : any

  constructor(
    private router: Router,
    private cookie: CookieService,
    private photosService: PhotosService,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private serviceAprendiz : AprendizService
    ){ }

  async ngOnInit() {
    await this.getSiderBar(this.dataperfiles)
    await this.obtenerMyphoto(this.id_user , this.id_aprendiz)

    localStorage.getItem('id_aprendiz') == null ? this.bollId = true : this.bollId = false
    this.bollId == true ?  this.obtenerMyProfile() : this.getDataAprendiz()

    this.subscription = this.photosService.resfresh$.subscribe(() => {
      this.obtenerMyphoto(this.id_user , this.id_aprendiz)
    })

    this.id_user == null ?  console.log('No hay notificaciones siderbar') : this.getMyNotifications(this.id_user);

    this.subscriptionNoti = this.notificationService.refresh$.subscribe(() => {
      this.id_user == null ?  console.log('No hay notificaciones siderbar') : this.getMyNotifications(this.id_user);
    })

    // this.subscriptionPermisos = this.loginService.resfresh$.subscribe(() => {
    //   console.log("pero que pasa hermano")
    //  this.getSiderBar(this.dataperfiles)
    // })

  }

  obtenerMyProfile () {
    this.photosService.myprofile(this.id_user).subscribe(data => {
     this.dataMyProfile = data.results
   })
 }
 getDataAprendiz () {
     this.serviceAprendiz.getByIdAprendiz(localStorage.getItem('id_aprendiz')).subscribe(data => {
       this.dataMyProfile = data.results
     })
 }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionNoti.unsubscribe();
  }

  async getSiderBar(permisos: any) {
    ROUTES = []
    for (let permiso of permisos) {
      if (permiso.estado != null) {      
        const valor = {
          path: permiso.url_item_modulo,
          title: permiso.item_modulo,
          icon: permiso.icono_item_modulo,
          class: ''
        }
        if (localStorage.getItem('id_aprendiz') != null && permiso.url_item_modulo == '/create-bitacora/') {
          valor.path = `create-bitacora/${localStorage.getItem('id_asignacion')}`
        }
        ROUTES.push(valor)
      }

    }
    this.menuItems = ROUTES.filter(menuItem => menuItem)
  }

  getMyNotifications(id: any) {
    this.notificationService.getMyNotifications(id).subscribe(
      (data) => {
        // console.log(data);

        if (data.status == "success") {
          this.notifications = data.results;
          this.countNofications = this.notifications.length;

          // console.log(this.notifications);
        } else {
          this.notifications = null;
          this.countNofications = 0;
        }
      },
      (err) => {
        Swal.fire({
          title: "Error",
          text: "Hay un error de servidor",
          icon: "error",
        });
      }
    );
  }

  cambiarEstadoNotificacion(estado_notificacion:string,id: any) {
    this.notificationService.changeStatusNotification(estado_notificacion,id).subscribe(
      (data) => {
        this.getMyNotifications(this.id_user)
        // console.log(data);
        
      },
      (err) => {
        Swal.fire({
          title: "Error",
          text: "Hay un error de servidor",
          icon: "error",
        });
      }
    );
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  async obtenerMyphoto(id_user : any , id_aprendiz : any ) {
    let pathh: string
    let bodypath: string
    await this.photosService.dowloadOneImage(id_user ,id_aprendiz ).subscribe(data => {
      if (data.status === 'success') {
        bodypath = data.results.path
        pathh = BaseUrlImages.concat(bodypath.substring(8))
        this.path = pathh
      } else {
        this.path = null
      }
      localStorage.setItem('pathImageURL', this.path)
    })
  }
}

