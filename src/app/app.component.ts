import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { InactivityService } from './Services/Security/inactivity.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';

  constructor(
    private inactivityService: InactivityService,
    private router: Router
  ) {
    this.preventBackNavigation();
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const token = sessionStorage.getItem('token');
      
      if (token && !event.url.includes('/login')) {
        this.inactivityService.startWatching();
      } else {
        this.inactivityService.stopWatching();
      }
    });
  }

  ngOnDestroy() {
    this.inactivityService.stopWatching();
  }

  
  private preventBackNavigation() {
    window.addEventListener('popstate', (event) => {
      const token = sessionStorage.getItem('token');
      const currentUrl = this.router.url;
      
      if (!token && !currentUrl.includes('/login')) {
        this.router.navigate(['/login']);
        window.history.pushState(null, '', '/login');
      }
      
      if (token && currentUrl.includes('/login')) {
        this.router.navigate(['/dashboard']);
        window.history.pushState(null, '', '/dashboard');
      }
    });
  }
}