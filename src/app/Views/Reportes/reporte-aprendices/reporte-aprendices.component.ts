import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'app/Services/Reportes/reporte.service';
import { AssignmentService } from '../../../Services/assignment/assignment.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx'
import Chart from 'chart.js/auto';
import * as moment from "moment";
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-reporte-aprendices',
  templateUrl: './reporte-aprendices.component.html',
  styleUrls: ['./reporte-aprendices.component.css']
})
export class ReporteAprendicesComponent implements OnInit {
  pageActual:number = 1
  canvas= document.getElementsByTagName("canvas");
  listAprendices =[]
  filtrado = []
  selected = 'option1';
  fecha_ini = ''
  listarAprendicesFiltrado = []
  listFase = []
  contApre_Asignado = 0
  contReasignado = 0
  contApre_PorCertificar= 0
  mostrarDatos= false
  cont_Certificado = 0
  mostrarTabla= 0
  mostrarGraficas= 0
  filterFase =""
  id_req= 0
  fecha_condicion = "true"
  public chart: any;
  public chart2: any;
  user_id_centro = sessionStorage.getItem("user_id_centro");
  user_id_perfil = sessionStorage.getItem("user_id_perfil");
  filtroFechas = new FormGroup({
    fecha_inicial: new FormControl('', [Validators.required]),
    fecha_final: new FormControl("", [Validators.required]),
  });
  constructor(private asignadoServices : AssignmentService,
              private reporteServices :ReporteService
    ) { }

  ngOnInit(): void {
    this.listarAprendices()
    this.listarFases()
    this.generarContadores()
    
  }
  changeTable(){
  this.mostrarTabla = 1
  this.mostrarGraficas = 0
  console.log(this.id_req)
  }
  changeGraficas(){
  this.listarAprendices()
  this.mostrarGraficas = 1
  this.mostrarTabla = 0
  }
  listarAprendices(){
    this.asignadoServices.getAllAssignments(this.user_id_centro, this.user_id_perfil).subscribe(data =>{
      this.listAprendices = data.results
      this.listarAprendicesFiltrado = data.results
      this.generarContadores()
    })
  }
  listarFases(){
    this.reporteServices.getFases().subscribe(data =>{
      this.listFase= data.results
    })
  }
  filtrarFases(){
    
    let arregloFiltrado = []
    for(let aprendiz of this.listAprendices){
      let fase = aprendiz.estado_fase_id
      // console.log(fase)
      // console.log(this.filterFase);
      
      if(fase.indexOf(this.filterFase) >= 0){
      // console.log(aprendices)

        arregloFiltrado.push(aprendiz)
        // console.log(arregloFiltrado);
        
      }
      
      this.listarAprendicesFiltrado = arregloFiltrado
    }
    if(this.listarAprendicesFiltrado.length == 0){
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
      this.filterFase = ""
      this.listarAprendicesFiltrado= this.listAprendices
    }
  }
  exportExcel(){
    let data = XLSX.utils.json_to_sheet(
      this.listarAprendicesFiltrado,
      {
        header: [
          "identificacion",
          "nombre_aprendiz",
          "apellido_aprendiz",
          "estado_fase",
          "nombre_usuario",
        ],
      }
    );
    (data["A1"].v = "identificacion"),
    (data["B1"].v = "nombre_aprendiz"),
    (data["C1"].v = "apellido_aprendiz"),
    (data["D1"].v = "estado_fase"),
    (data["E1"].v = "nombre_usuario");
    const workbook = XLSX.utils.book_new();
    const filename =
    "Reporte Aprendices " +
    new Date().getFullYear() +
    "-" +
    (new Date().getMonth() + 1);
    XLSX.utils.book_append_sheet(workbook, data, filename);
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  }
  async generarContadores(){
    this.contApre_Asignado = 0
    this.contReasignado = 0
    this.contApre_PorCertificar= 0
    this.cont_Certificado = 0
    for (let i of this.listAprendices){
      if(i.estado_fase == "Asignado"){
        this.contApre_Asignado = this.contApre_Asignado +1
        
        
      }else if(i.estado_fase == "Por certificar"){
        this.contApre_PorCertificar = this.contApre_PorCertificar +1

      }else if(i.estado_fase == "Certificado"){
        this.cont_Certificado = this.cont_Certificado + 1
      

      }else if(i.estado_fase == "Reasignado"){
        this.contReasignado = this.contReasignado +1
  

      }
    }
    this.graficas()
  }
  graficas(){
    //doughnut
  this.chart= new Chart(this.canvas[0],{
      type: "bar",
      data:{
        labels:[
          "Asignados",
          "Por Certificar",
          "Certificado",
          "Reasignado"
        ],
        datasets:[
          {
            label: "Fases",
            data:[
            this.contApre_Asignado,
            this.contApre_PorCertificar,
            this.cont_Certificado,
            this.contReasignado
            ],
            backgroundColor:[
          "#F2A633",
          "#33DDF2",
          "#7DDB39",
          "rgba(153, 102, 255, 0.2)",
          ],
          borderColor:[
          "rgb(255, 99, 132)",
          "#247EF5",  
          "#43A700",
          "rgb(201, 203, 207)",
          ] ,
          borderWidth:1,
          }
        ]
        
      }
      
    });
  this.chart2 = new Chart (this.canvas[1],{
    type: "doughnut",
      data:{
        labels:[
          "Asignados",
          "Por Certificar",
          "Certificado",
          "Reasignado"
        ],
        datasets:[
          {
            label: "Fases",
            data:[
            this.contApre_Asignado,
            this.contApre_PorCertificar,
            this.cont_Certificado,
            this.contReasignado
            ],
            backgroundColor:[
          "#F2A633",
          "#33DDF2",
          "#7DDB39",
          "rgba(153, 102, 255, 0.2)",
          ],
          borderColor:[
          "rgb(255, 99, 132)",
          "#247EF5",  
          "#43A700",
          "rgb(201, 203, 207)",
          ] ,
          borderWidth:1,
          }
        ]
        
      }
  })
  }
  filtrar(form : any){
    this.asignadoServices.filtarFecha(form).subscribe(data=>{
      if(data.status == 'success'){
      this.listarAprendicesFiltrado = data.results
      this.filtrado = data.results
      this.mostrarDatos = true
      }else{
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
        this.listarAprendicesFiltrado= this.filtrado
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
}
