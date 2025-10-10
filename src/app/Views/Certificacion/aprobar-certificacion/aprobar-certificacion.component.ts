import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { CertificacionService } from 'app/Services/certificacion/certificacion.service';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap"; import { DocumentI } from "./../../../models/Documents/Document.interface";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DocsApiService } from "../../../Services/docs/docs-api.service";
import { BaseUrlDocs } from "../../../../GlobalConstanst"; //interface base url service

@Component({
  selector: 'app-aprobar-certificacion',
  templateUrl: './aprobar-certificacion.component.html',
  styleUrls: ['./aprobar-certificacion.component.css']
})
export class AprobarCertificacionComponent implements OnInit {
  docValido = false
  id: string;
  nombreDoc: null
  event: any
  file = null
  file2 = null
  listDocumentos: any
  listDocumentos2:any
  listDocumentos3:any
  listDocumentos4:any
  listDocumentos5:any
  listDocumentos6:any
  tipo1:any
  tipo2:any
  tipo3:any
  tipo4:any
  tipo5:any
  tipo6:any
  aprobado = false
  aprobado2 = false
  aprobado3= false
  aprobado4 = false
  aprobado5 = false
  aprobado6 = false

  doc: DocumentI = {};
  modalSwith: boolean = false;
  closeResult = "";
  safeSrc?: SafeResourceUrl;


  constructor(private fb: FormBuilder,
    private certificacionService: CertificacionService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private docApi: DocsApiService,
    private modalService: NgbModal,
    private activerouter: ActivatedRoute,
    private sanitizer: DomSanitizer
    ) 
    
    { this.id = this.aRoute.snapshot.paramMap.get("id"); }

  ngOnInit(): void {
    this.listarDocs()
  }
  listarDocs(){
    let asignacion_id = this.id
    this.certificacionService.getDocumentos(1,asignacion_id).subscribe(data=>{
      this.listDocumentos = data.results
      console.log(this.listDocumentos);
      for (let i = 0; i < this.listDocumentos.length; i++) {
        const element = this.listDocumentos[i];
        if (element.estado == 'Aprobado'){
          this.aprobado = true
        }
      }
    })
    this.certificacionService.getDocumentos(2,asignacion_id).subscribe(data=>{
      this.listDocumentos2 = data.results
      for (let i = 0; i < this.listDocumentos2.length; i++) {
        const element = this.listDocumentos2[i];
        if (element.estado == 'Aprobado'){
          this.aprobado2 = true
        }
      }
    })
    this.certificacionService.getDocumentos(3,asignacion_id).subscribe(data=>{
      this.listDocumentos3 = data.results
      this.tipo3 =this.listDocumentos3[0].estado
      for (let i = 0; i < this.listDocumentos3.length; i++) {
        const element = this.listDocumentos3[i];
        if (element.estado == 'Aprobado'){
          this.aprobado3 = true
        }
      }
    })
    this.certificacionService.getDocumentos(4,asignacion_id).subscribe(data=>{
      this.listDocumentos4 = data.results
      this.tipo4 =this.listDocumentos4[0].estado
      for (let i = 0; i < this.listDocumentos4.length; i++) {
        const element = this.listDocumentos4[i];
        if (element.estado == 'Aprobado'){
          this.aprobado4 = true
        }
      }
    })
    this.certificacionService.getDocumentos(5,asignacion_id).subscribe(data=>{
      this.listDocumentos5 = data.results
      this.tipo5 =this.listDocumentos5[0].estado
      for (let i = 0; i < this.listDocumentos5.length; i++) {
        const element = this.listDocumentos5[i];
        if (element.estado == 'Aprobado'){
          this.aprobado5 = true
        }
      }
    })
    this.certificacionService.getDocumentos(6,asignacion_id).subscribe(data=>{
      this.listDocumentos6 = data.results
      this.tipo6 =this.listDocumentos6[0].estado
      for (let i = 0; i < this.listDocumentos6.length; i++) {
        const element = this.listDocumentos6[i];
        if (element.estado == 'Aprobado'){
          this.aprobado6 = true
        }
      }
    })
  }
  cambiarEstadoDoc(estado_documento:string, id_documentos_cert:number,requisito_id:number){
    let asignacion_id = this.id
    Swal.fire({
      title:'Cambiar estado',
      text:'Estas seguro que quieres cambiar el estado del documento a ' + estado_documento,
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((res)=>{
      if(res.isConfirmed){
        this.certificacionService.cambiaEstado(requisito_id,id_documentos_cert,estado_documento,asignacion_id).subscribe(data=>{
          
          if(data.status == 'error'){
            Swal.fire({
              title:'Error',
              text:data.message  ,
              icon:'error',
            }
            )

          }else{
            Swal.fire({
              title:'Estado Actualizado!',
              text:data.message  ,
              icon:'success',
            }
            )
            this.listarDocs()

          }
        })
        
      }
    })
  }

  open(content: any, documento_id: any) {
    this.getIdDocumentBitacora1(documento_id)
    this.modalService
      .open(content, {
        ariaLabelledBy: "modal-basic-title",
        size: "lg",
        centered: true,
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

  getIdDocumentBitacora1(id_docuemnto: any) {

    console.log(id_docuemnto);

    this.docApi.getDocument(id_docuemnto).subscribe((data: any) => {
      this.doc = data.results;
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
        BaseUrlDocs + this.doc.ruta
      );
    });
  }


}

