import { Component, OnInit, OnDestroy } from "@angular/core";
import { AssignmentI2 } from "../../../models/Assignments/Assignment.interface";
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
export class ListMyAssingmentsComponent implements OnInit, OnDestroy {
  registernovedad: boolean = false;
  registerseguimiento: boolean = false;
  createbitacora: boolean = false;
  retroalimentaciobitacoras: boolean = false;
  modalSwith: boolean = false;
  closeResult = "";

  assignments: AssignmentI2[] = [];
  filterIdentificacion = "";
  pageActual: number = 1;
  private modalRef: any;

  constructor(
    private assignmentapiservice: AssignmentService,
    private servicesPerfiles: PerfilesService,
    private seguimientoService: SeguimientoService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const id_user = this.getIdLoguedIn();
    this.setpermisos();
    this.getMyAssignments(id_user);
  }

  ngOnDestroy(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  open(content: any) {
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
      scrollable: true,
    });
    
    this.modalRef.result.then(
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
    const permisosString = sessionStorage.getItem("data_perfil");
    
    if (!permisosString) {
      console.warn("No hay permisos en sessionStorage");
      return;
    }

    try {
      const permisos = JSON.parse(permisosString);
      
      if (!Array.isArray(permisos)) {
        console.warn("Los permisos no son un array válido");
        return;
      }

      this.registernovedad = permisos.some(p => p.url_item_modulo === "/register-novedad/");
      this.registerseguimiento = permisos.some(p => p.url_item_modulo === "/register-seguimiento/");
      this.createbitacora = permisos.some(p => p.url_item_modulo === "/create-bitacora/");
      this.retroalimentaciobitacoras = permisos.some(p => p.url_item_modulo === "/retroalimentacion-bitacoras/");
    } catch (error) {
      console.error("Error al parsear permisos:", error);
    }
  }

  getMyAssignments(id: any) {
    this.assignmentapiservice.getMyAssignments(id).subscribe(
      (data) => {
        if (data.status === "success" && data.results && Array.isArray(data.results)) {
          this.assignments = data.results;
          // Procesar seguimientos de forma secuencial para evitar race conditions
          this.procesarSeguimientosSecuencial(0);
        } else {
          this.assignments = [];
        }
      },
      (err) => {
        console.error("Error al obtener asignaciones:", err);
        this.assignments = [];
        Swal.fire({
          title: "Error",
          text: "Hay un error de servidor",
          icon: "error",
        });
      }
    );
  }

  private procesarSeguimientosSecuencial(index: number) {
    if (index >= this.assignments.length) {
      return; // Terminamos de procesar todos
    }

    const assignment = this.assignments[index];
    this.segAprobados(assignment.id_asignacion, () => {
      // Callback para procesar el siguiente
      this.procesarSeguimientosSecuencial(index + 1);
    });
  }

  getIdLoguedIn() {
    return sessionStorage.getItem("id_user");
  }

  segAprobados(id: string, callback?: () => void) {
    this.seguimientoService.segAprobados(id).subscribe(
      (data) => {
        const hoy = moment().format("YYYY-MM-DD");
        
        if (data.status === "success" && data.results && Array.isArray(data.results)) {
          const results = data.results;
          
          // Inicializar contadores de seguimientos
          let tieneSeg1 = false;
          let tieneSeg2 = false;
          let tieneSeg3 = false;
          let seg1Aprobado = false;
          let seg2Aprobado = false;
          let seg3Aprobado = false;

          // Analizar todos los seguimientos
          for (const seguimiento of results) {
            const tipoSeg = seguimiento.tipo_seguimiento_id;
            const esAprobado = seguimiento.estado_documento === "Aprobado";

            if (tipoSeg === "1") {
              tieneSeg1 = true;
              if (esAprobado) seg1Aprobado = true;
            } else if (tipoSeg === "2") {
              tieneSeg2 = true;
              if (esAprobado) seg2Aprobado = true;
            } else if (tipoSeg === "3") {
              tieneSeg3 = true;
              if (esAprobado) seg3Aprobado = true;
            }
          }

          // Obtener las fechas de la asignación (del primer seguimiento)
          const asignacion = results[0]?.Asignacion;
          if (!asignacion) {
            if (callback) callback();
            return;
          }

          // Actualizar seg_1
          if (seg1Aprobado) {
            this.actualizarSeg(1, "Aprobado", id);
          } else if (tieneSeg1) {
            const atrasado = moment(hoy).isAfter(asignacion.fecha_seguimiento_inicial);
            this.actualizarSeg(1, atrasado ? "Atrasado" : "No estas Atrasado", id);
          } else {
            const atrasado = moment(hoy).isAfter(asignacion.fecha_seguimiento_inicial);
            this.actualizarSeg(1, atrasado ? "Atrasado" : "No estas Atrasado", id);
          }

          // Actualizar seg_2
          if (seg2Aprobado) {
            this.actualizarSeg(2, "Aprobado", id);
          } else if (tieneSeg2) {
            const atrasado = moment(hoy).isAfter(asignacion.fecha_seguimiento_parcial);
            this.actualizarSeg(2, atrasado ? "Atrasado" : "No estas Atrasado", id);
          } else {
            const atrasado = moment(hoy).isAfter(asignacion.fecha_seguimiento_parcial);
            this.actualizarSeg(2, atrasado ? "Atrasado" : "No estas Atrasado", id);
          }

          // Actualizar seg_3
          if (seg3Aprobado) {
            this.actualizarSeg(3, "Aprobado", id);
          } else if (tieneSeg3) {
            const atrasado = moment(hoy).isAfter(asignacion.fecha_seguimiento_final);
            this.actualizarSeg(3, atrasado ? "Atrasado" : "No estas Atrasado", id);
          } else {
            const atrasado = moment(hoy).isAfter(asignacion.fecha_seguimiento_final);
            this.actualizarSeg(3, atrasado ? "Atrasado" : "No estas Atrasado", id);
          }

        } else {
          // No hay seguimientos, verificar solo fecha inicial
          const asignacion = data.results;
          if (asignacion && asignacion.fecha_seguimiento_inicial) {
            const atrasado = moment(hoy).isAfter(asignacion.fecha_seguimiento_inicial);
            this.actualizarSeg(1, atrasado ? "Atrasado" : "No estas Atrasado", id);
          }
        }

        if (callback) callback();
      },
      (err) => {
        console.error("Error en segAprobados:", err);
        if (callback) callback();
      }
    );
  }

  private actualizarSeg(tipo: 1 | 2 | 3, estado: string, id: string) {
    const metodosActualizacion = {
      1: (est: string, idAsig: string) => this.assignmentapiservice.changeStatusSeg1(est, idAsig),
      2: (est: string, idAsig: string) => this.assignmentapiservice.changeStatusSeg2(est, idAsig),
      3: (est: string, idAsig: string) => this.assignmentapiservice.changeStatusSeg3(est, idAsig)
    };

    metodosActualizacion[tipo](estado, id).subscribe(
      () => {
        // Actualizar el array local para reflejar el cambio inmediatamente
        const assignment = this.assignments.find(a => a.id_asignacion === id);
        if (assignment) {
          assignment[`seg_${tipo}`] = estado;
        }
      },
      (error) => console.error(`Error actualizando seg_${tipo}:`, error)
    );
  }
}