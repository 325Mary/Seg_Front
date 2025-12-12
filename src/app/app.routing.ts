import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./Views/login/login.component";
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { VigilantGuard } from './Guards/vigilant.guard'
import { NotfoudComponent } from './Views/SystemMessagues/notfoud/notfoud.component'

import {PublicComponent} from "./Views/Public/public/public.component";
// import { NotfoudComponent } from './Views/SystemMessagues/notfoud/notfoud.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'notFound',
    component: NotfoudComponent
  },

  {
    path : 'public',
    component : PublicComponent
   }, 
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [VigilantGuard],
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    // AppRoutingModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
