import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'app/Services/assignment/assignment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AprendizService } from 'app/Services/aprendiz/aprendiz.service';
import { subscribeOn } from 'rxjs-compat/operator/subscribeOn';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-lista-mis-asignados',
  templateUrl: './lista-mis-asignados.component.html',
  styleUrls: ['./lista-mis-asignados.component.css']
})
export class ListaMisAsignadosComponent implements OnInit {
  id: string | null;
  pageActual: number = 1
  constructor(private asignadosServices: AssignmentService,
    private aprendicezServices: AprendizService,
    private aRoute: ActivatedRoute) { this.id = this.aRoute.snapshot.paramMap.get('id') }
  misAsignados = []
  allMysFichas = []
  misAprendicesByFichas = []
  body: any
  numero_horas = 0;
  mostrar_tabla = false;
  ngOnInit(): void {
    this.allAsignados()
    this.allFichasByInstructor()
    // this.getAprendices()
  }
  allAsignados() {
    let id_user = this.id
    this.asignadosServices.getMyAssignments(id_user).subscribe(data => {
      this.misAsignados = data.results
    })
  }
  allFichasByInstructor() {
    this.aprendicezServices.allFichasByInstructor(this.id).subscribe(data => {
      this.allMysFichas = data.results
    })
  }
  todasMisFichas(ficha: any) {
    this.aprendicezServices.allMysFichas(this.id, ficha).subscribe(data => {
      this.misAprendicesByFichas = data.results
      console.log(this.misAprendicesByFichas[0]);


      this.numero_horas = data.message
      this.body = this.numero_horas, this.misAprendicesByFichas,

        // console.log(this.body,"✔");
        this.mostrar_tabla = true

    })
  }
  exportExcel() {
    this.misAprendicesByFichas.push(
      {
        nombre_aprendiz: "",
        identificacion: "",
        apellido_aprendiz: "",
        correo_misena: "",
        ficha: "",
        telefono: "",
        fecha_seguimiento_inicial: "",
        fecha_seguimiento_parcial: "",
        fecha_seguimiento_final: "",
        seg_1: "",
        seg_2: "",
        seg_3: "",
        correo_alternativo: "",
        nombre_usuario: "Total horas",
        apellido_usuario: this.numero_horas
      }
    )
    let data = XLSX.utils.json_to_sheet(
      this.misAprendicesByFichas
    );
    // (data["A1"].v = "Identificacion"),
    //   (data["B1"].v = "Nombre Aprendiz"),
    //   (data["C1"].v = "Apellido Aprendiz"),
    //   (data["G1"].v = "Correo Misena"),
    //   (data["D1"].v = "Ficha"),
    //   (data["E1"].v = "Telefono"),
    //   (data["F1"].v = "Fecha Seguimiento Inicial")
    // (data.Q1.v = " "+this.numero_horas)
    ;
    const workbook = XLSX.utils.book_new();
    // XLSX.utils.sheet_add_aoa(data, [["Identificacion", "Nombre Aprendiz","Apellido Aprendiz", "aa", "aa", "aa", "aa", "aa", "aa"]], { origin: "A1" });
    const filename =
      "Reporte de Horas " +
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1);
    XLSX.utils.book_append_sheet(workbook, data, filename);
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  }

}
