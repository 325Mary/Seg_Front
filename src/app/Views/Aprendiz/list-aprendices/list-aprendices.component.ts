import { Component, OnInit } from '@angular/core';
import { AprendizService } from '../../../Services/aprendiz/aprendiz.service';
// import { DocsApiService } from '../../../Services/'
import Swal from 'sweetalert2';
import { Aprendiz_re_DTO } from '../../../models/Aprendiz/aprendiz_RE_DTO';
import { W } from 'chart.js/dist/chunks/helpers.core';

@Component({
  selector: 'app-list-aprendices',
  templateUrl: './list-aprendices.component.html',
  styleUrls: ['./list-aprendices.component.css']
})
export class ListAprendicesComponent implements OnInit {
  filterIdentificacion = "";
  pageActual: number = 1;
  docValido = false
  data: any = []
  nombreDoc = null
  file = null
  listAprendices?: Aprendiz_re_DTO[] = []
  private fileTmp: any
  event: any
  constructor(private aprendicesService: AprendizService,
    // private apiDoc:DocsApiService,
  ) { }

  ngOnInit(): void {
    this.getAprendices();
  }

  getAprendices() {
    this.aprendicesService.getAprendices().subscribe(data => {
      this.listAprendices = data.results;
      //console.log({ data, a: this.listAprendices })
    }, error => {
      // console.log(error)
    })
  }

  deleteAprendiz(id: any) {
    this.aprendicesService.deleteAprendiz(id).subscribe(data => {
      this.getAprendices()
    })
  }
  deleteREPwithAprendiz(id: any) {
    Swal.fire({
      title: 'Eliminar Aprendiz',
      text: 'Estas seguro que quieres eliminar este aprendiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((results) => {
      if (results.isConfirmed) {
        this.aprendicesService.deleteREPwithAprendiz(id).subscribe(data => {
          if (data.status == 'success') {
            this.getAprendices()
            Swal.fire(
              'Aprendiz Eliminado!',
              'El aprendiz fue eliminado con exito',
              'success'
            )
          } else {
            Swal.fire({
              title: 'Error',
              text: 'El aprendiz ya empezo su proceso de formacion',
              icon: 'error',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
            }
            )
          }

        })

      }
    })

  }

  //Excel
  onDocumentChange(event): void {
    this.event = event
    if (event.target.files[0].size <= 2000000) {
      this.nombreDoc = event.target.files[0].name
      let exDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf('.'))
      if (exDoc == ".xlsx") {
        this.file = event.target.files[0]
        Swal.fire({
          title: "Archivo cargado exitosamente!",
          // text: "Archivo cargado exitosamente!",
          icon: 'success',
          confirmButtonText: "Aceptar",
          confirmButtonColor: "007bb8"
        });
        this.docValido = true
      } else {
        this.docValido = false;
        this.file = null;
        this.nombreDoc = null
        Swal.fire({
          title: "Error",
          text: "El archivo cargado no es un CSV",
          icon: "error",
        })
      }
    } else {
      this.docValido = false;
      this.file = null;
      this.nombreDoc = null
    }
  }


  sendFile(documento: any) {
    this.aprendicesService.createDocuments(documento, this.file)
      .subscribe((res) => {
        console.log({ res });
        setTimeout(() => {
          this.getAprendices();
        }, 3000);


        if (res.status == 'success') {
          Swal.fire({
            title: 'Excel Importado',
            text: 'El excel fue importado con exito',
            icon: 'success',
          })
          this.getAprendices();

          this.nombreDoc = null
          this.docValido = false;
          this.file = null;
          // this.toastr.success('Excel enviado con exito','Excel subido');
          this.event = null

        } else {
          Swal.fire({
            title: 'Error',
            text: res.message,
            icon: 'error',
          })

        }
      }, err => {
        Swal.fire({
          title: 'Error',
          text: 'Hay un error de servidor',
          icon: 'error',
        });
        this.nombreDoc = null
        this.docValido = false;
        this.file = null;
      })
    this.getAprendices();

  }
}
