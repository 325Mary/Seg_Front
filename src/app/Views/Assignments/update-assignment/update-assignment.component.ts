import { NoveltyI } from "./../../../models/Novedad/Novelty.interface";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AssignmentService } from "../../../Services/assignment/assignment.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Aprendiz } from "../../../models/Aprendiz/aprendiz";
import Swal from "sweetalert2";
import { AssignmentI } from "../../../models/Assignments/Assignment.interface";
import { User } from "../../../models/users/user.interface";
import { EstadoFaseI } from "../../../models/Fases/Fase.interface";
import * as moment from "moment";


@Component({
  selector: "app-update-assignment",
  templateUrl: "./update-assignment.component.html",
  styleUrls: ["./update-assignment.component.css"],
})
export class UpdateAssignmentComponent implements OnInit {
  id_asignacion = this.activerouter.snapshot.paramMap.get("id_asignacion");

  assignment: AssignmentI;
  fases: EstadoFaseI[] = [];
  novedades: NoveltyI[] = [];
  usuarios: User[];

  assignmentEditForm = new FormGroup({
    aprendiz_id: new FormControl(""),
    fecha_seguimiento_inicial: new FormControl("", [Validators.required]),
    fecha_seguimiento_parcial: new FormControl("", [Validators.required]),
    fecha_seguimiento_final: new FormControl("", [Validators.required]),
    fecha_evaluacion_final: new FormControl("", [Validators.required]),
    estado_fase_id: new FormControl(""),
    novedad_id: new FormControl(""),
    usuario_responsable_id: new FormControl("", [Validators.required]),        
  });
  fecha_1 = "true";
  fecha_2 = "true";
  fecha_3 = "true";

  fecha_11: any;
  fecha_22: any;
  fecha_33: any;

  fecha_primer_seguimiento: number = 90;
  fecha_segundo_seguimiento: number = 170;
  fecha_ultimo_seguimiento: number = 170;

  fecha_seg_parcial: any;
  fecha_seg_final: any;
  fecha_eva_final: any;

  constructor(
    private activerouter: ActivatedRoute,
    private assignmentapiservice: AssignmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAssignment(this.id_asignacion)
    this.getDataForm();
  }

  getAssignment(id_asignacion){

    this.assignmentapiservice.getAssignment(id_asignacion).subscribe(data => {

      if ( data.status == 'success') {
        this.assignment = data.results;

        this.assignmentEditForm.setValue({
          "aprendiz_id" : this.assignment.aprendiz_id,
          "fecha_seguimiento_inicial" : this.assignment.fecha_seguimiento_inicial,
          "fecha_seguimiento_parcial" : this.assignment.fecha_seguimiento_parcial,
          "fecha_seguimiento_final" : this.assignment.fecha_seguimiento_final,
          "fecha_evaluacion_final" : this.assignment.fecha_evaluacion_final,
          "estado_fase_id" : this.assignment.estado_fase_id,
          "novedad_id" : this.assignment.novedad_id,
          "usuario_responsable_id" : this.assignment.usuario_responsable_id
        })
      }

    },err => {
      Swal.fire({
        title: 'Error',
        text: 'Hay un error de servidor',
        icon: 'error',
      });
    }
  )

  }

  getDataForm() {
    this.assignmentapiservice.getDataForm().subscribe((data) => {
      if (data.status != 'success') {
        Swal.fire({
          title: 'Error',
          text: data.message || 'Hay un error del servidor',
          icon: 'error',
        });
      }

      this.usuarios = data.results.usuarios;
      this.fases = data.results.fases;
      this.novedades = data.results.novedades;

    }, err => {
      Swal.fire({
        title: 'Error',
        text: 'Hay un error de servidor',
        icon: 'error',
      });
    });
  }

 

  PutForm(dataForm: AssignmentI) {
    if (this.assignmentEditForm.valid) {
      this.assignmentapiservice.putAssignment(dataForm,this.id_asignacion).subscribe((data) => {

        if (data.status == "info") {
          Swal.fire({
            title: "Inconsistencia en los datos",
            text: data.message,
            icon: "error",
          });
        }
        if (data.status == 'success') {
          Swal.fire({
            title: 'Aprendiz Actualizado!',
            text: 'Datos del aprendiz actualizados correctamente',
            icon: 'success',
          });
          this.router.navigate(['list-assignments'])
        } else if (data.status == "error") {
          Swal.fire({
            title: "Inconsistencia en los datos",
            text: data.message,
            icon: "error",
          });
        }
      });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Todos los campos son obligatorios',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  validarFechas() {
    if (this.assignmentEditForm.get("fecha_seguimiento_inicial").value != null) {
      this.fecha_11 = this.assignmentEditForm.get(
        "fecha_seguimiento_inicial"
      ).value;
      this.fecha_seg_parcial = moment(this.fecha_11)
        .add(this.fecha_primer_seguimiento, "days")
        .toDate();
      this.fecha_22 = this.fecha_seg_parcial;
      this.assignmentEditForm
        .get("fecha_seguimiento_parcial")
        .setValue(this.fecha_22);
      this.fecha_seg_final = moment(this.fecha_11)
        .add(this.fecha_segundo_seguimiento, "days")
        .toDate();
      this.fecha_33 = this.fecha_seg_final;
      this.assignmentEditForm
        .get("fecha_seguimiento_final")
        .setValue(this.fecha_33);
      // this.fecha_eva_final = moment(this.fecha_11)
      //   .add(this.fecha_ultimo_seguimiento, "days")
      //   .toDate();
      // this.assignmentEditForm
      //   .get("fecha_evaluacion_final")
      //   .setValue(this.fecha_eva_final);
      this.fecha_1 = "false";
      this.fecha_2 = "false";
      this.fecha_3 = "false";
    } else {
      this.fecha_1 = "true";
      this.fecha_2 = "true";
      this.fecha_3 = "true";
    }
  }

}
