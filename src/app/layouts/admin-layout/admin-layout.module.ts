import { data } from 'jquery';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { TypographyComponent } from "../../typography/typography.component";
import { IconsComponent } from "../../icons/icons.component";
import { MapsComponent } from "../../maps/maps.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { UpgradeComponent } from "../../upgrade/upgrade.component";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
// import { MatAutocompleteModule } from "@angular/material/autocomplete";
import {NgxPaginationModule} from 'ngx-pagination';

import { CreateAssignmentComponent } from "./../../Views/Assignments/create-assignment/create-assignment.component";
import { UpdateAssignmentComponent } from "./../../Views/Assignments/update-assignment/update-assignment.component";
import { RegisterAprendizComponent } from "../../Views/Aprendiz/register-aprendiz/register-aprendiz.component";
import { RegisterNovedadComponent } from "../../Views/Novedad/register-novedad/register-novedad.component";
import { UpdateComponentUser } from "../../Views/users/update/update.component";
import { CreateComponentUser } from "../../Views/users/create/create.component";
import { ReassignAprendizComponent } from "../../Views/Assignments/reassign-aprendiz/reassign-aprendiz.component";
import { RegisterCertificacionComponent } from "app/Views/Certificacion/register-certificacion/register-certificacion.component";
import { ReporteAprendicesComponent } from '../../Views/Reportes/reporte-aprendices/reporte-aprendices.component';
import { ReporteUsuariosComponent } from '../../Views/Reportes/reporte-usuarios/reporte-usuarios.component';
import { ListaMisAsignadosComponent } from '../../Views/Reportes/lista-mis-asignados/lista-mis-asignados.component';

import { CreateComponentModulePermiss } from '../../Views/module-permissions/create/create.component';
import { UpdateComponentModulePermiss } from '../../Views/module-permissions/update/update.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // MatAutocompleteModule,
    NgxPaginationModule  
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    CreateAssignmentComponent,
    UpdateAssignmentComponent,
    RegisterAprendizComponent,
    UpdateComponentUser,
    RegisterNovedadComponent,
    CreateComponentUser,
    ReassignAprendizComponent,
    RegisterCertificacionComponent,
    ReporteAprendicesComponent,
    ReporteUsuariosComponent,
    ListaMisAsignadosComponent,
    UpdateComponentModulePermiss,
    CreateComponentModulePermiss,
  ],
})
export class AdminLayoutModule {}
