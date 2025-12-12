import { Component, OnInit, OnDestroy } from "@angular/core";
import Swal from "sweetalert2";
import { AssignmentI2 } from "./../../../models/Assignments/Assignment.interface";
import { AssignmentService } from "../../../Services/assignment/assignment.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { SeguimientoService } from "../../../Services/seguimiento.service";
import * as moment from "moment";

@Component({
  selector: "app-list-assignments",
  templateUrl: "./list-assignments.component.html",
  styleUrls: ["./list-assignments.component.css"],
})
export class ListAssignmentsComponent implements OnInit, OnDestroy {
  assignments: AssignmentI2[] = [];
  filterIdentificacion = "";
  pageActual: number = 1;
  susbscription: Subscription;
  retroalimentacion: boolean = false;
    user_id_centro = sessionStorage.getItem("user_id_centro");
  user_id_perfil = sessionStorage.getItem("user_id_perfil");

  constructor(
    private assignmentapiservice: AssignmentService,
    private router: Router,
    private seguimientoService: SeguimientoService,
  ) {}

  ngOnInit(): void {
    this.getAssignments();
    this.setpermisos();

    
    
    
    
  }
  ngOnDestroy(): void {
    
    
  }

  setpermisos() {
    const permisos = JSON.parse(sessionStorage.getItem("data_perfil"));

    const resultadoretroalimentacion = (valor) => valor.url_item_modulo == "/retroalimentacion/";
    const permisosretroalimentacion = permisos.some(resultadoretroalimentacion);
    this.retroalimentacion = permisosretroalimentacion;

  }

  getAssignments() {
    this.assignmentapiservice.getAllAssignments(this.user_id_centro, this.user_id_perfil).subscribe(
      (data) => {
        if (data.status == "success") {
          this.assignments = data.results;
          for (let assignment of this.assignments) {
            this.segAprobados(assignment.id_asignacion);
          }
        } else {
          this.assignments = null;
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

  reassign(id_asignacion: any) {
    Swal.fire({
      title: "Reasignacion de Aprendiz",
      text: `¿Esta seguro que desea Reasignar este Aprendiz?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Reasignar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#007bb8",
      cancelButtonColor: "#2d2d2d",
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(["/reassign-aprendiz/", id_asignacion]);
      }
    });
  }

  deleteAssignment(id_asignacion: any) {
    Swal.fire({
      title: "Eliminar Asignación",
      text: "¿Desea eliminar esta Asignación?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#007bb8",
      cancelButtonColor: "#2d2d2d",
    }).then((result) => {
      if (result.isConfirmed) {
        this.assignmentapiservice.deleteAssignment(id_asignacion).subscribe(
          (data) => {
            this.getAssignments();
            Swal.fire(
              "Asignación Eliminada!",
              "La asignación fue eliminada correctamente!",
              "success"
            );
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
    });
  }

  segAprobados(id: string) {
    
    

    this.seguimientoService.segAprobados(id).subscribe(
      (data) => {
        
        const hoy = moment().format("YYYY-MM-DD");
        
        if (data.status == "success") {
          let results = data.results;

          
          for (let seguimiento of results) {

            const estado_seg = seguimiento.tipo_seguimiento_id;
            if (estado_seg == "1") {
              if (seguimiento.estado_documento != "Aprobado") {
                
                
                
                if (!(seguimiento.Asignacion.fecha_seguimiento_inicial >= hoy)) {
                  
                  
                  this.assignmentapiservice.changeStatusSeg1("Atrasado", id).subscribe()

                } else {
                  
                  this.assignmentapiservice.changeStatusSeg1("No estas Atrasado", id).subscribe()

                }
              }else if(seguimiento.estado_documento == "Aprobado"){
                

                this.assignmentapiservice.changeStatusSeg1("Aprobado", id).subscribe()

              }
            }
            if (estado_seg == "2") {
              if (seguimiento.estado_documento != "Aprobado") {
                
                if (!(seguimiento.Asignacion.fecha_seguimiento_parcial >= hoy)) {
                  
                  this.assignmentapiservice.changeStatusSeg2("Atrasado", id).subscribe()

                } else {
                  
                  this.assignmentapiservice.changeStatusSeg2("No estas Atrasado", id).subscribe()
                }
              }
              if(seguimiento.estado_documento == "Aprobado"){
                
                
                this.assignmentapiservice.changeStatusSeg2("Aprobado", id).subscribe()
                
              }

              
                

              
            }else {
              if (!(seguimiento.Asignacion.fecha_seguimiento_parcial >= hoy)) {
                
                
                this.assignmentapiservice.changeStatusSeg2("Atrasado", id).subscribe()

              } else {
                
                this.assignmentapiservice.changeStatusSeg2("No estas Atrasado", id).subscribe()
                
              }
              
              

              
            }
            if (estado_seg == "3") {
              
              if (seguimiento.estado_documento != "Aprobado") {
                
                
                
                if (!(seguimiento.Asignacion.fecha_seguimiento_final >= hoy)) {
                  
                  this.assignmentapiservice.changeStatusSeg3("Atrasado", id).subscribe()
                } else {
                  this.assignmentapiservice.changeStatusSeg3("No estas Atrasado", id).subscribe()
                  
                }
              }else if(seguimiento.estado_documento == "Aprobado"){
                
                this.assignmentapiservice.changeStatusSeg3("Aprobado", id).subscribe()
              }
            }else {
              if (!(seguimiento.Asignacion.fecha_seguimiento_final >= hoy)) {
                
                
                this.assignmentapiservice.changeStatusSeg3("Atrasado", id).subscribe()

              } else {
                
                this.assignmentapiservice.changeStatusSeg3("No estas Atrasado", id).subscribe()
              }
              
              
            }
          }
        } else {
          let asignacion = data.results;

          if (!(asignacion.fecha_seguimiento_inicial >= hoy)) {
            
            
            
            this.assignmentapiservice.changeStatusSeg1("Atrasado", id).subscribe()
          } else {
            
            this.assignmentapiservice.changeStatusSeg1("No estas Atrasado", id).subscribe()
          }
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
}
