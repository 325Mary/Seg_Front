import { NoveltyI } from "./../../../models/Novedad/Novelty.interface";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AssignmentService } from "../../../Services/assignment/assignment.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Aprendiz } from "../../../models/Aprendiz/aprendiz";
import Swal from "sweetalert2";
import {
  AssignmentI,
  PostAssignmentI,
} from "../../../models/Assignments/Assignment.interface";
import { User } from "../../../models/users/user.interface";
import { EstadoFaseI } from "../../../models/Fases/Fase.interface";
@Component({
  selector: "app-reassign-aprendiz",
  templateUrl: "./reassign-aprendiz.component.html",
  styleUrls: ["./reassign-aprendiz.component.css"],
})
export class ReassignAprendizComponent implements OnInit {
  id_asignacion = this.activerouter.snapshot.paramMap.get("id_asignacion");

  assignment: AssignmentI;

  postassignment: PostAssignmentI;
  fases: EstadoFaseI[] = [];
  novedades: NoveltyI[] = [];
  usuarios: User[];
    user_id_centro = sessionStorage.getItem("user_id_centro");
  user_id_perfil = sessionStorage.getItem("user_id_perfil");

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
  constructor(
    private activerouter: ActivatedRoute,
    private assignmentapiservice: AssignmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAssignment(this.id_asignacion);
    this.getDataForm();
  }

  getAssignment(id_asignacion) {
    this.assignmentapiservice.getAssignment(id_asignacion).subscribe(
      (data) => {
        console.log(data);

        if (data.status == "success") {
          this.assignment = data.results;
          this.postassignment = {
            aprendiz_id: this.assignment.aprendiz_id,
            fecha_seguimiento_inicial:this.assignment.fecha_seguimiento_inicial,
            fecha_seguimiento_parcial:this.assignment.fecha_seguimiento_parcial,
            fecha_seguimiento_final: this.assignment.fecha_seguimiento_final,
            fecha_evaluacion_final: this.assignment.fecha_evaluacion_final,
            estado_fase_id: 1,
            usuario_responsable_id: this.assignment.usuario_responsable_id,
            novedad_id: this.assignment.novedad_id,
          };

          this.assignmentEditForm.setValue({
            aprendiz_id: this.assignment.aprendiz_id,
            fecha_seguimiento_inicial:this.assignment.fecha_seguimiento_inicial,
            fecha_seguimiento_parcial:this.assignment.fecha_seguimiento_parcial,
            fecha_seguimiento_final: this.assignment.fecha_seguimiento_final,
            // fecha_evaluacion_final: this.assignment.fecha_evaluacion_final,
            estado_fase_id: this.assignment.estado_fase_id,
            novedad_id: this.assignment.novedad_id,
            usuario_responsable_id: this.assignment.usuario_responsable_id,
          });
          //   // console.log(this.assignment.fecha_seguimiento_inicial)
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

  getDataForm() {
    this.assignmentapiservice.getDataForm(this.user_id_centro, this.user_id_perfil).subscribe(
      (data) => {
        // console.log(data.results);

        if (data.status != "success") {
          Swal.fire({
            title: "Error",
            text: data.message || "Hay un error del servidor",
            icon: "error",
          });
        }

        this.usuarios = data.results.usuarios;
        this.fases = data.results.fases;
        this.novedades = data.results.novedades;

        // console.log(this.novedades);
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

  PutForm(dataForm: AssignmentI) {
  let usuario_responsable_actualizado = dataForm.usuario_responsable_id;
  let usuario_responsable_actual = this.postassignment.usuario_responsable_id;

  if (usuario_responsable_actualizado != usuario_responsable_actual) {
    const dataToSend = {
      ...this.postassignment,
      usuario_responsable_id: usuario_responsable_actualizado,
      estado_fase_id: this.assignment.estado_fase_id,
      novedad_id: this.assignment.novedad_id
    };

    this.assignmentapiservice
      .putAssignment(dataToSend as AssignmentI, this.id_asignacion)
      .subscribe((data) => {
        if (data.status == "success") {
          Swal.fire({
            title: "Aprendiz Reasignado",
            text: "Aprendiz Reasignado Correctamente",
            icon: "success",
          });

          this.assignmentapiservice
            .postAssignment(this.postassignment)
            .subscribe((data) => {
              // console.log(data);
            });

          this.router.navigate(["list-assignments"]);
        } else {
          Swal.fire({
            title: "Error",
            text: "Hay un error de servidor",
            icon: "error",
          });
        }
      });
  } else {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: "Por favor asigna a un instructor diferente",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
}
