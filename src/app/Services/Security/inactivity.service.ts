import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../Services/login/login.service'; 

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private inactivityTime: number = 65 * 60 * 1000; 
  private inactivityTimer: any;
  private warningTimer: any;
  private warningTime: number = 60 * 60 * 1000; 

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private loginService: LoginService 
  ) {}

  startWatching() {
    this.resetTimer();
    this.setupListeners();
  }

  stopWatching() {
    this.clearTimers();
    this.removeListeners();
  }

  private resetTimer() {
    this.clearTimers();

    this.ngZone.runOutsideAngular(() => {
      this.warningTimer = setTimeout(() => {
        this.ngZone.run(() => {
          this.showWarning();
        });
      }, this.warningTime);

      this.inactivityTimer = setTimeout(() => {
        this.ngZone.run(() => {
          this.logout();
        });
      }, this.inactivityTime);
    });
  }

  private clearTimers() {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }
    if (this.warningTimer) {
      clearTimeout(this.warningTimer);
    }
  }

  private setupListeners() {
    const events = ['mousedown', 'keypress', 'scroll', 'touchstart', 'click', 'mousemove'];
    
    events.forEach(event => {
      document.addEventListener(event, this.resetTimer.bind(this), true);
    });
  }

  private removeListeners() {
    const events = ['mousedown', 'keypress', 'scroll', 'touchstart', 'click', 'mousemove'];
    
    events.forEach(event => {
      document.removeEventListener(event, this.resetTimer.bind(this), true);
    });
  }

  private showWarning() {
    Swal.fire({
      title: 'Inactividad detectada',
      text: 'Tu sesión se cerrará en 5 minutos por inactividad. ¿Deseas continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cerrar sesión',
      allowOutsideClick: false,
      timer: 120000, 
      timerProgressBar: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.resetTimer();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.logout();
      } else if (result.dismiss === Swal.DismissReason.timer) {
        this.logout();
      }
    });
  }

  private logout() {
  this.clearTimers();
  this.removeListeners();

  // Marcar la sesión como inactiva
  sessionStorage.setItem('isActiveSession', 'false');

  this.loginService.logout().subscribe();

  Swal.fire({
    title: 'Sesión cerrada',
    text: 'Tu sesión ha sido cerrada por inactividad',
    icon: 'info',
    confirmButtonText: 'Aceptar',
    allowOutsideClick: false
  }).then(() => {
    this.router.navigate(['/login']).then(() => {
      window.history.replaceState(null, '', '/login');
    });
  });
}

  public manualLogout() {
    this.logout();
  }
}