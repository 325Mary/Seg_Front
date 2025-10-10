import { Component, OnInit } from "@angular/core";
import { AssignmentI2 } from "../../../models/Assignments/Assignment.interface";
import { EstadoFaseI } from "../../../models/Fases/Fase.interface";
import { Aprendiz } from "../../../models/Aprendiz/aprendiz";
import { User } from "../../../models/users/user.interface";
import { AssignmentService } from "../../../Services/assignment/assignment.service";
import { SeguimientoService } from "../../../Services/seguimiento.service";
import { PerfilesService } from "../../../Services/perfiles/perfiles.service";
import Swal from "sweetalert2";
import * as moment from "moment";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-list-my-assingments",
  templateUrl: "./list-my-assingments.component.html",
  styleUrls: ["./list-my-assingments.component.css"],
})
export class ListMyAssingmentsComponent implements OnInit {
  registernovedad: boolean = false;
  registerseguimiento: boolean = false;
  createbitacora: boolean = false;
  retroalimentaciobitacoras: boolean = false;
  modalSwith: boolean = false;
  closeResult = "";

  assignments: AssignmentI2[] = [];
  filterIdentificacion = "";
  pageActual: number = 1;

  constructor(
    private assignmentapiservice: AssignmentService,
    private servicesPerfiles: PerfilesService,
    private seguimientoService: SeguimientoService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    let id_user = this.getIdLoguedIn();
    this.setpermisos();
    this.getMyAssignments(id_user);
  }

  open(content: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: "modal-basic-title",
        size: "lg",
        scrollable: true,
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  setpermisos() {
    const permisos = JSON.parse(localStorage.getItem("data_perfil"));

    const resultadonovedad = (valor) =>
      valor.url_item_modulo == "/register-novedad/";
    const permisosregisternovedad = permisos.some(resultadonovedad);
    this.registernovedad = permisosregisternovedad;

    const resultadoseguimiento = (valor) =>
      valor.url_item_modulo == "/register-seguimiento/";
    const permisoseguimiento = permisos.some(resultadoseguimiento);
    this.registerseguimiento = permisoseguimiento;

    const resultadocreatebitacora = (valor) =>
      valor.url_item_modulo == "/create-bitacora/";
    const permisoscreatebitacora = permisos.some(resultadocreatebitacora);
    this.createbitacora = permisoscreatebitacora;

    const resultadoretroalimentaciobitacoras = (valor) =>
      valor.url_item_modulo == "/retroalimentacion-bitacoras/";
    const permisosretroalimentaciobitacoras = permisos.some(
      resultadoretroalimentaciobitacoras
    );
    this.retroalimentaciobitacoras = permisosretroalimentaciobitacoras;
  }

  getMyAssignments(id: any) {
    this.assignmentapiservice.getMyAssignments(id).subscribe(
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

  getIdLoguedIn() {
    return localStorage.getItem("id_user");
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
                // console.log(
                //   "es diferente de aprobado " + estado_seg + " " + id
                // );
                if (!(seguimiento.Asignacion.fecha_seguimiento_inicial >= hoy)) {
                  // console.log("estas atrasado" + " " + id + " " + estado_seg);
                  
                  this.assignmentapiservice.changeStatusSeg1("Atrasado", id).subscribe(data => {console.log({data})})

                } else {
                  // console.log("no estas atrasado" + " " + id + " " + estado_seg);
                  this.assignmentapiservice.changeStatusSeg1("No estas Atrasado", id).subscribe(data => {console.log({data})})

                }
              }else if(seguimiento.estado_documento == "Aprobado"){
                // console.log('estas Aprobado'  + " " + estado_seg);

                this.assignmentapiservice.changeStatusSeg1("Aprobado", id).subscribe(data => {console.log({data})})

              }
            }
            if (estado_seg == "2") {
              if (seguimiento.estado_documento != "Aprobado") {
                // console.log("es diferente de aprobado " + estado_seg + " " + id);
                if (!(seguimiento.Asignacion.fecha_seguimiento_parcial >= hoy)) {
                  // console.log("estas atrasado case 2");
                  this.assignmentapiservice.changeStatusSeg2("Atrasado", id).subscribe(data => {console.log({data})})

                } else {
                  // console.log("no estas atrasado" + " " + id + " " + estado_seg);
                  this.assignmentapiservice.changeStatusSeg2("No estas Atrasado", id).subscribe(data => {console.log({data})})
                }
              }
              if(seguimiento.estado_documento == "Aprobado"){
                // console.log('estas Aprobado'  + " " + estado_seg);
                
                this.assignmentapiservice.changeStatusSeg2("Aprobado", id).subscribe(data => {console.log({data})})
                // return;
              }

              // console.log('entre al if ');
                // return;

              
            }else {
              if (!(seguimiento.Asignacion.fecha_seguimiento_parcial >= hoy)) {
                // console.log(seguimiento.Asignacion.fecha_seguimiento_parcial);
                // console.log("estas atrasado case 2");
                this.assignmentapiservice.changeStatusSeg2("Atrasado", id).subscribe(data => {console.log({data})})

              } else {
                // console.log("no estas atrasado" + " " + id + " " + estado_seg);
                this.assignmentapiservice.changeStatusSeg2("No estas Atrasado", id).subscribe(data => {console.log({data})})
                // return;
              }
              // console.log('No hay 2');
              // console.log('entre al else ');

              
            }
            if (estado_seg == "3") {
              // case "3":
              if (seguimiento.estado_documento != "Aprobado") {
                // console.log(
                //   "es diferente de aprobado " + estado_seg + " " + id
                // );
                if (!(seguimiento.Asignacion.fecha_seguimiento_final >= hoy)) {
                  // console.log("estas atrasado case 3");
                  this.assignmentapiservice.changeStatusSeg3("Atrasado", id).subscribe(data => {console.log({data})})
                } else {
                  this.assignmentapiservice.changeStatusSeg3("No estas Atrasado", id).subscribe(data => {console.log({data})})
                  
                }
              }else if(seguimiento.estado_documento == "Aprobado"){
                // console.log('estas Aprobado'  + " " + estado_seg);
                this.assignmentapiservice.changeStatusSeg3("Aprobado", id).subscribe(data => {console.log({data})})
              }
            }else {
              if (!(seguimiento.Asignacion.fecha_seguimiento_final >= hoy)) {
                // console.log(seguimiento.Asignacion.fecha_seguimiento_final);
                // console.log("estas atrasado case 3");
                this.assignmentapiservice.changeStatusSeg3("Atrasado", id).subscribe(data => {console.log({data})})

              } else {
                // console.log("no estas atrasado" + " " + id + " " + estado_seg);
                this.assignmentapiservice.changeStatusSeg3("No estas Atrasado", id).subscribe(data => {console.log({data})})
              }
            }
          }
        } else {
          let asignacion = data.results;

          if (!(asignacion.fecha_seguimiento_inicial >= hoy)) {
            // console.log(
            //   "estas atrasado porque no tienes seguimientos" + " " + id 
            // );
            this.assignmentapiservice.changeStatusSeg1("Atrasado", id).subscribe(data => {})
          } else {
            // console.log("no estas atrasado" + " " + id);
            this.assignmentapiservice.changeStatusSeg1("No estas Atrasado", id).subscribe(data => {console.log({data})})
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
