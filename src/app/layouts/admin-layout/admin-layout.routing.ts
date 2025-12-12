import { ReassignAprendizComponent } from './../../Views/Assignments/reassign-aprendiz/reassign-aprendiz.component';
import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { TypographyComponent } from "../../typography/typography.component";
import { IconsComponent } from "../../icons/icons.component";
import { MapsComponent } from "../../maps/maps.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { UpgradeComponent } from "../../upgrade/upgrade.component";
import { ListAssignmentsComponent } from "../../Views/Assignments/list-assignments/list-assignments.component";
import { CreateAssignmentComponent } from "./../../Views/Assignments/create-assignment/create-assignment.component";
import { UserDataComponent } from "./../../Views/user-data/user-data.component";
import { EditComponent } from "./../../Views/user-data/edit/edit.component";
import { MydatauserComponent } from "./../../Views/user-data/mydatauser/mydatauser.component";
import { ListMyAssingmentsComponent } from './../../Views/Assignments/list-my-assingments/list-my-assingments.component';
import { UpdateAssignmentComponent } from './../../Views/Assignments/update-assignment/update-assignment.component';
import { ListAprendicesComponent } from '../../Views/Aprendiz/list-aprendices/list-aprendices.component';
import { RegisterAprendizComponent } from '../../Views/Aprendiz/register-aprendiz/register-aprendiz.component';
import { RegisterSeguimientoComponent } from '../../Views/Seguimiento/register-seguimiento/register-seguimiento.component';
import { RegisterNovedadComponent } from '../../Views/Novedad/register-novedad/register-novedad.component';
import { VigilantGuard } from '../../Guards/vigilant.guard';
import { GuardRolesGuard } from '../../Guards/roles/guard-roles.guard';
// import { ViewComponent } from '../../Views/users/view/view.component';
import { DocumentListComponent } from "../../Views/Documents/document-list/document-list.component";
import { DocumentPreviewComponent } from "../../Views/Documents/document-preview/document-preview.component";
import { CreateDocumentComponent } from "../../Views/Documents/create-document/create-document.component";
import { VistaComponent } from "../../Views/users/vista/vista.component";
import { RetroalimentacionSeguimientoComponent } from '../../Views/Seguimiento/retroalimentacion-seguimiento/retroalimentacion-seguimiento.component';
import { RegistrarBitacoraComponent } from '../../Views/Bitacora/registrar-bitacora/registrar-bitacora.component';
import { RetroalimentacionBitacoraComponent } from '../../Views/Bitacora/retroalimentacion-bitacora/retroalimentacion-bitacora.component';
import { RegisterCertificacionComponent } from '../../Views/Certificacion/register-certificacion/register-certificacion.component';
import { AprobarCertificacionComponent } from '../../Views/Certificacion/aprobar-certificacion/aprobar-certificacion.component';
import { ListAprendicesPorCertificarComponent } from "app/Views/Certificacion/list-aprendices-por-certificar/list-aprendices-por-certificar.component";
import { ReporteAprendicesComponent } from '../../Views/Reportes/reporte-aprendices/reporte-aprendices.component';
import { InformacionAprendizComponent } from '../../Views/Aprendiz/informacion-aprendiz/informacion-aprendiz.component';
import { ReporteUsuariosComponent } from '../../Views/Reportes/reporte-usuarios/reporte-usuarios.component';
import { ListaMisAsignadosComponent } from '../../Views/Reportes/lista-mis-asignados/lista-mis-asignados.component';

import { ModulePermissionsComponent } from '../../Views/module-permissions/module-permissions.component';
import { CreateComponentModulePermiss } from '../../Views/module-permissions/create/create.component';
import { CreateComponentUser } from '../../Views/users/create/create.component';
import { UpdateComponentModulePermiss } from '../../Views/module-permissions/update/update.component';
import { UpdateComponentUser } from '../../Views/users/update/update.component';
import { ReporteHorasComponent } from '../../Views/Reportes/reporte-horas/reporte-horas.component';
import { VerDetalleAprendizComponent } from 'app/Views/Aprendiz/ver-detalle-aprendiz/ver-detalle-aprendiz.component';
import { CentroFormacionComponent } from "app/Views/centros_data/centro-formacion/centro-formacion.component";
import {EditComponentCentro} from 'app/Views/centros_data/edit/edit.component'
import { CreateCentrosComponent } from 'app/Views/centros_data/create-centros/create-centros.component';
import { CiudadComponent } from "app/Views/ciudad-data/ciudad/ciudad.component";
import { UpdateCiudadComponent } from "app/Views/ciudad-data/update-ciudad/update-ciudad.component";
import { CreatedCiudadComponent } from 'app/Views/ciudad-data/created-ciudad/created-ciudad.component';
import { EmpresaComponent } from "app/Views/Empresa/empresa/empresa.component";
import { CrearEmpresaComponent } from "app/Views/Empresa/crear-empresa/crear-empresa.component";
import { EditarEmpresaComponent } from "app/Views/Empresa/editar-empresa/editar-empresa.component";
import { EpsComponent } from "app/Views/Eps/eps/eps.component";
import { CrearEpsComponent } from "app/Views/Eps/crear-eps/crear-eps.component";
import { EditarrEpsComponent } from "app/Views/Eps/editarr-eps/editarr-eps.component";

const Rutas: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  // {
  //   path: "user-profile",
  //   component: UserProfileComponent
  // },
  // {
  //   path: "table-list",
  //   component: TableListComponent
  // },
  // {
  //   path: "typography",
  //   component: TypographyComponent
  // },
  // {
  //   path: "icons",
  //   component: IconsComponent
  // },
  // {
  //   path: "maps",
  //   component: MapsComponent
  // },
  // {
  //   path: "notifications",
  //   component: NotificationsComponent,
  // },
  // {
  //   path: "upgrade",
  //   component: UpgradeComponent
  // },
  {
    path: "user-data",
    component: UserDataComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: "edit-data-user",
    component: EditComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: "datauser",
    component: MydatauserComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: "list-assignments",
    component: ListAssignmentsComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard],
  },
  {
    path: "list-my-assignments",
    component: ListMyAssingmentsComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard],

  },
  {
    path: "assignment-aprendiz/:id_aprendiz",
    component: CreateAssignmentComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: "update-assignment/:id_asignacion",
    component: UpdateAssignmentComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: "list-aprendices",
    component: ListAprendicesComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard],
  },
  {
    path: "register-aprendiz",
    component: RegisterAprendizComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard],
  },
  {
    path: "edit-aprendiz/:id",
    component: RegisterAprendizComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: 'register-seguimiento/:id',
    component: RegisterSeguimientoComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: "retroalimentacion/:id",
    component: RetroalimentacionSeguimientoComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: 'register-novedad/:id',
    component: RegisterNovedadComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: 'createuser',
    component: CreateComponentUser,
    // canActivate: [VigilantGuard, GuardRolesGuard],
  },
  {
    path: 'updateuser/:id',
    component: UpdateComponentUser,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: 'vistausuarios',
    component: VistaComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard],
  },
  {
    path: "view-documets",
    component: DocumentListComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard],
  },
  {
    path: "view-documet/:id_documento",
    component: DocumentPreviewComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: "create-document",
    component: CreateDocumentComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard],
  },
  {
    path: "create-bitacora/:id",
    component: RegistrarBitacoraComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: "reporte-usuarios",
    component: ReporteUsuariosComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: "retroalimentacion-bitacoras/:id",
    component: RetroalimentacionBitacoraComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: "create-certificacion/:id",
    component: RegisterCertificacionComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: "aprobar-certificacion/:id",
    component: AprobarCertificacionComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: "lista-aprendices-por-certificar",
    component: ListAprendicesPorCertificarComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard],
  },
  {
    path: "reassign-aprendiz/:id_asignacion",
    component: ReassignAprendizComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: "reporte-aprendices",
    component: ReporteAprendicesComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard],
  },
  {
    path: "informacion-aprendiz/:id",
    component: InformacionAprendizComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: "gestionar-roles",
    component: ModulePermissionsComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: "createItemModules",
    component: CreateComponentModulePermiss,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: "UpdateItemModules/:id",
    component: UpdateComponentModulePermiss,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: "lista-mis_asignados/:id",
    component: ListaMisAsignadosComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: "reporte-horas",
    component: ReporteHorasComponent,
  },
  {
    path:"ver-detalle-aprendiz/:id",
    component:VerDetalleAprendizComponent
  },
  {
    path:"centro-de-formacion",
    component:CentroFormacionComponent
  },
  {
    path: 'updateCentro/:id',
    component: EditComponentCentro,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path: 'createCentro',
    component: CreateCentrosComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard],
  },
  {
    path:"ciudad",
    component:CiudadComponent
  },
  {
    path: 'updateCiudad/:id',
    component: UpdateCiudadComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  { 
    path: 'crearCiudad',
    component: CreatedCiudadComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard],
  },
  {
    path:"empresa",
    component:EmpresaComponent
  },
  { 
    path: 'crearEmpresa',
    component: CrearEmpresaComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard],
  },
  {
    path: 'editarEmpresa/:id',
    component: EditarEmpresaComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
  {
    path:"eps",
    component:EpsComponent
  },
  {
    path: 'crearEps',
    component: CrearEpsComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard],
  },
  { 
    path: 'editarEps/:id',    
    component: EditarrEpsComponent,
    // canActivate: [VigilantGuard, GuardRolesGuard]
  },
];
//procesar rutas
const filterPermisess = () => {
  let permisos: Routes = []
  const modules = JSON.parse(sessionStorage.getItem('modules'))
  console.log(modules);
  Rutas.forEach((route, indexR) => {
    for (let i of modules) {
      if (route.path.includes('/') && i.url_item_modulo.includes('/')) {
        const bdname = i.url_item_modulo.split('/')
        const routename = route.path.split('/')
        if (routename[0] == bdname[1]) {
          route.data = i.perfiles
          permisos.push(route)
          break
        }
      } else {
        if (route.path == i.url_item_modulo) {
          route.data = i.perfiles
          permisos.push(route)
          break
        }
      }
    }
  })
  console.log(permisos);
  return permisos
}
// export const AdminLayoutRoutes: any = filterPermisess()
export const AdminLayoutRoutes: any = Rutas