import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../Services/Users/users.service';
import { AssignmentService } from '../../../Services/assignment/assignment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx'
import Chart from 'chart.js/auto';
import Swal from 'sweetalert2';
import { AprendizService } from 'app/Services/aprendiz/aprendiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporte-usuarios',
  templateUrl: './reporte-usuarios.component.html',
  styleUrls: ['./reporte-usuarios.component.css']
})
export class ReporteUsuariosComponent implements OnInit {
  listaUsuarios = []
  pageActual: number = 1
  canvas = document.getElementsByTagName("canvas");
  listUsarios = []
  listUsuariosFiltrado = []
  MisAsignados = []
  fecha_condicion = "true"
  allAprendices = []
  listarAreas = []
  fecha_ini = ''
  listUsersExcel = []
  constInstructor = 0
  constArendiz = 0
  constAdministrado = 0
  constSuperA = 0
  conTInactivo = 0
  id_req = 0
  mostrarTabla = 0
  mostrarGraficas = 0
  public chart: any;
  public chart2: any;
  filtroFechas = new FormGroup({
    fecha_inicial: new FormControl('', [Validators.required]),
    fecha_final: new FormControl("", [Validators.required]),
  });
  constructor(private usuarioServices: UsersService,
    private aprendicezServices: AprendizService,
    private asigmentServices: AssignmentService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.listarUsuarios()
    this.generarContadores()
    this.getAprendices()
    this.UsuariosExcel()
    // this.allAreas()
  }
  changeTable() {
    this.mostrarTabla = 1
    this.mostrarGraficas = 0
  }
  changeGraficas() {
    this.listarUsuarios()
    this.mostrarGraficas = 1
    this.mostrarTabla = 0
  }
  listarUsuarios() {
    this.usuarioServices.getAllusers().subscribe(data => {
      this.listUsarios = data.results
      this.generarContadores()
    })
  }
  UsuariosExcel() {
    this.usuarioServices.users().subscribe(data => {
      this.listUsersExcel = data.results
      this.listUsuariosFiltrado = data.results
    })
  }
  filtrar(form: any) {
    this.usuarioServices.filtrarUsuarios(form).subscribe(data => {
      if (data.status == 'success') {
        this.listUsuariosFiltrado = data.results
      } else {
        Swal.fire({
          title: "No hay coincidencias",
          position: "center",
          timer: 1000,
          text: "No se encontró asignados que coincidan con las busqueda",
          showConfirmButton: false,
          // confirmButtonText: "Aceptar",
          // confirmButtonColor: "#007bb8",
          backdrop: "rgba(0,0,0,0)",
          background: "#eeeeee",
        });
        this.listUsuariosFiltrado = this.listUsarios
      }
    })
  }
  validarFechas() {
    if (this.filtroFechas.get("fecha_inicial").value != null) {
      this.fecha_condicion = "false"
      this.fecha_ini = this.filtroFechas.get(
        "fecha_inicial"
      ).value;
    }
  }
  exportExcel() {
    let data = XLSX.utils.json_to_sheet(
      this.listUsuariosFiltrado,
      {
        header: [
          "nombres",
          "apellidos",
          "correo_institucional",
          "identificacion",
          "genero",
        ],
      }
    );
    (data["A1"].v = "nombres"),
      (data["B1"].v = "apellidos"),
      (data["C1"].v = "correo_institucional"),
      (data["D1"].v = "identificacion"),
      (data["E1"].v = "genero");
    const workbook = XLSX.utils.book_new();
    const filename =
      "Reporte Usuarios " +
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1);
    XLSX.utils.book_append_sheet(workbook, data, filename);
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  }
  getAprendices() {
    this.aprendicezServices.getAprendices().subscribe(data => {
      this.allAprendices = data.results.length
    })
  }
  async generarContadores() {
    this.constInstructor = 0
    this.constArendiz = 0
    this.constAdministrado = 0
    this.constSuperA = 0
    for (let i of this.listUsarios) {
      if (i.perfil_id == 1) {
        this.constInstructor = this.constInstructor + 1
      } else if (i.perfil_id == 3) {
        this.constAdministrado = this.constAdministrado + 1

      } else if (i.perfil_id == 4) {
        this.constSuperA = this.constSuperA + 1

      }

    }
    this.graficas()
  }
  graficas() {
    //doughnut

    this.chart = new Chart(this.canvas[0], {
      type: "bar",
      data: {
        labels: [
          "Instructor",
          "Aprendiz",
          "Admisnistrador",
          // "Super Administrador"
        ],
        datasets: [
          {
            label: "Perfil",
            data: [
              this.constInstructor,
              this.allAprendices,
              this.constAdministrado,
              // this.constSuperA
            ],
            backgroundColor: [
              "#F2A633",
              "#33DDF2",
              "#7DDB39",
              // "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "#247EF5",
              "#43A700",
              // "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
          }
        ]

      }

    });
    this.chart2 = new Chart(this.canvas[1], {
      type: "doughnut",
      data: {
        labels: [
          "Instructor",
          "Aprendiz",
          "Admisnistrador",
          // "Super Administrador"
        ],
        datasets: [
          {
            label: "Fases",
            data: [
              this.constInstructor,
              this.allAprendices,
              this.constAdministrado,
              // this.constSuperA
            ],
            backgroundColor: [
              "#F2A633",
              "#33DDF2",
              "#7DDB39",
              // "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "#247EF5",
              "#43A700",
              // "rgb(201, 203, 207)"
            ],
            borderWidth: 1,
          }
        ]

      }
    })
  }
  
  // [routerLink]="['/lista-mis_asignados/', usuario.id_usuario]"
  misAsignados(id_user:any){
    this.asigmentServices.getMyAssignments(id_user).subscribe(data=>{
      this.MisAsignados = data.results
      if(this.MisAsignados !== null){
      this.router.navigate(['/lista-mis_asignados/',id_user])
      }else{
        Swal.fire({
          title: "Error",
          text: "Este usuario no tiene aprendices asignados",
          icon: "error",
        })
      }
    })
  }

}
