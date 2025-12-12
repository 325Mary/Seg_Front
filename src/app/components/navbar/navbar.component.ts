import { Component, OnInit, OnDestroy, ElementRef } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { NotificationService } from "../../Services/notification/notification.service";
import { InactivityService } from "../../Services/Security/inactivity.service";
import { NotificationI } from "./../../models/Notification/Notification.interface";
import Swal from "sweetalert2";
import { Subscription } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  pageActual: number = 1;

  susbscription: Subscription;
  notifications: NotificationI[];
  countNofications: number = 0;
  id_user = sessionStorage.getItem("id_user");

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private cookie: CookieService,
    private notificationService: NotificationService,
    private inactivityService: InactivityService
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName("close-layer")[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });

    this.id_user == null
      ? console.log("No hay notificaciones navbar")
      : this.getMyNotifications(this.id_user);

    this.susbscription = this.notificationService.refresh$.subscribe(() => {
      this.id_user == null
        ? console.log("No hay notificaciones navbar")
        : this.getMyNotifications(this.id_user);
    });
  }

  ngOnDestroy(): void {
    this.susbscription.unsubscribe();
  }

  cambiarEstadoNotificacion(estado_notificacion: string, id: any) {
    this.notificationService
      .changeStatusNotification(estado_notificacion, id)
      .subscribe(
        (data) => {
          this.ngOnInit();
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

  getMyNotifications(id: any) {
    this.notificationService.getMyNotifications(id).subscribe(
      (data) => {
        if (data.status == "success") {
          this.notifications = data.results;
          this.countNofications = this.notifications.length;
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

  goBack() {
    this.location.back();
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName("body")[0];
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);

    body.classList.add("nav-open");

    this.sidebarVisible = true;
  }

  sidebarClose() {
    const body = document.getElementsByTagName("body")[0];
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    body.classList.remove("nav-open");
  }

  sidebarToggle() {
    var $toggle = document.getElementsByClassName("navbar-toggler")[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName("body")[0];

    if (this.mobile_menu_visible == 1) {
      body.classList.remove("nav-open");
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove("toggled");
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add("toggled");
      }, 430);

      var $layer = document.createElement("div");
      $layer.setAttribute("class", "close-layer");

      if (body.querySelectorAll(".main-panel")) {
        document.getElementsByClassName("main-panel")[0].appendChild($layer);
      } else if (body.classList.contains("off-canvas-sidebar")) {
        document
          .getElementsByClassName("wrapper-full-page")[0]
          .appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add("visible");
      }, 100);

      $layer.onclick = function () {
        body.classList.remove("nav-open");
        this.mobile_menu_visible = 0;
        $layer.classList.remove("visible");
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove("toggled");
        }, 400);
      }.bind(this);

      body.classList.add("nav-open");
      this.mobile_menu_visible = 1;
    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }

  logout() {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que quieres cerrar tu sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.inactivityService.stopWatching();
        
        
        sessionStorage.clear();
        
        
        this.cookie.deleteAll();
        
        
        sessionStorage.clear();
        
        Swal.fire({
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión correctamente',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          
          this.router.navigate(['/login']).then(() => {
            
            window.history.replaceState(null, '', '/login');
            window.history.pushState(null, '', '/login');
          });
        });
      }
    });
  }
}