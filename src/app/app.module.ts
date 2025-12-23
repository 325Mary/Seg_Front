import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ListAssignmentsComponent } from './Views/Assignments/list-assignments/list-assignments.component';
import { FilterAssignmentsPipe } from './pipes/filter-assignments.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { UserDataComponent } from './Views/user-data/user-data.component';
import { EditComponent } from './Views/user-data/edit/edit.component';
import { MydatauserComponent } from './Views/user-data/mydatauser/mydatauser.component';
import { PhotoComponent } from './Views/user-data/photo/photo.component';
import { LoginComponent } from './Views/login/login.component';
import { UsersComponent } from './Views/users/users.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { TooltipModule } from "ng2-tooltip-directive";
import { Chart } from 'chart.js';


import { CreateAssignmentComponent } from './Views/Assignments/create-assignment/create-assignment.component';
import { DocumentListComponent } from './Views/Documents/document-list/document-list.component';
import { CreateDocumentComponent } from './Views/Documents/create-document/create-document.component';
import { DocumentPreviewComponent } from './Views/Documents/document-preview/document-preview.component';
import { ListMyAssingmentsComponent } from './Views/Assignments/list-my-assingments/list-my-assingments.component';
import { ListAprendicesComponent } from './Views/Aprendiz/list-aprendices/list-aprendices.component';
import { RegisterSeguimientoComponent } from "./Views/Seguimiento/register-seguimiento/register-seguimiento.component";
import { VistaComponent } from './Views/users/vista/vista.component';
import { RetroalimentacionSeguimientoComponent } from './Views/Seguimiento/retroalimentacion-seguimiento/retroalimentacion-seguimiento.component';
import { MydataaprendizComponent } from './Views/user-data/mydataaprendiz/mydataaprendiz.component';
import { RegistrarBitacoraComponent } from './Views/Bitacora/registrar-bitacora/registrar-bitacora.component';
import { RetroalimentacionBitacoraComponent } from './Views/Bitacora/retroalimentacion-bitacora/retroalimentacion-bitacora.component';
import { RegisterCertificacionComponent } from './Views/Certificacion/register-certificacion/register-certificacion.component';
import { AprobarCertificacionComponent } from './Views/Certificacion/aprobar-certificacion/aprobar-certificacion.component';
import { ListAprendicesPorCertificarComponent } from './Views/Certificacion/list-aprendices-por-certificar/list-aprendices-por-certificar.component';
import { RegisterAprendizComponent } from './Views/Aprendiz/register-aprendiz/register-aprendiz.component';
import { ReporteAprendicesComponent } from './Views/Reportes/reporte-aprendices/reporte-aprendices.component';
import { InformacionAprendizComponent } from './Views/Aprendiz/informacion-aprendiz/informacion-aprendiz.component';
import { ReporteUsuariosComponent } from './Views/Reportes/reporte-usuarios/reporte-usuarios.component';
import { ForbiddenComponent } from './Views/SystemMessagues/forbidden/forbidden.component';
import { ListaMisAsignadosComponent } from './Views/Reportes/lista-mis-asignados/lista-mis-asignados.component';
import { ModulePermissionsComponent } from './Views/module-permissions/module-permissions.component';
// import { CreateComponentModulePermiss } from './Views/module-permissions/create/create.component';
// import { UpdateComponentModulePermiss } from './Views/module-permissions/update/update.component';
import { PublicComponent } from './Views/Public/public/public.component';
import { ReporteHorasComponent } from './Views/Reportes/reporte-horas/reporte-horas.component';
import { VerDetalleAprendizComponent } from './Views/Aprendiz/ver-detalle-aprendiz/ver-detalle-aprendiz.component';
import { DetectarFormatoFechaPipe } from './detectar-formato-fecha.pipe';
import { CentroFormacionComponent } from './Views/centros_data/centro-formacion/centro-formacion.component';
import { CiudadComponent } from './Views/ciudad-data/ciudad/ciudad.component';
import { UpdateCiudadComponent } from './Views/ciudad-data/update-ciudad/update-ciudad.component';
import { CreatedCiudadComponent } from './Views/ciudad-data/created-ciudad/created-ciudad.component';
import { AuthInterceptor } from './Guards/auth.interceptor';
  
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    TooltipModule,
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ListAssignmentsComponent,
    FilterAssignmentsPipe,
    UserDataComponent,
    EditComponent,
    MydatauserComponent,
    PhotoComponent,
    LoginComponent,
    UsersComponent,
    DocumentListComponent,
    CreateDocumentComponent,
    DocumentPreviewComponent,
    ListMyAssingmentsComponent,
    ListAprendicesComponent,
    RegisterSeguimientoComponent,
    // RegisterSeguimientoComponent,
    VistaComponent,
    RetroalimentacionSeguimientoComponent,
    MydataaprendizComponent,
    RegistrarBitacoraComponent,
    RetroalimentacionBitacoraComponent,
    // RegisterCertificacionComponent,
    AprobarCertificacionComponent,
    ListAprendicesPorCertificarComponent,
    InformacionAprendizComponent,
    PublicComponent,
    // ReporteUsuariosComponent,
    // ReporteUsuariosComponent,
    ForbiddenComponent,
    // ListaMisAsignadosComponent,
    ModulePermissionsComponent,
    // UpdateComponentModulePermiss,
    // CreateComponentModulePermiss,
    ReporteHorasComponent,
    VerDetalleAprendizComponent,
    DetectarFormatoFechaPipe,
    CentroFormacionComponent,
    CiudadComponent,
    // ReporteAprendicesComponent,
    // RegisterAprendizComponent,

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true}
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  

})
export class AppModule { }
 