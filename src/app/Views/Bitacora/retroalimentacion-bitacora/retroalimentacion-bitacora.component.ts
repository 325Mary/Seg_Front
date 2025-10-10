import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { BitacoraService } from "../../../Services/Bitacoras/bitacora.service";
import Swal from "sweetalert2";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap"; import { DocumentI } from "./../../../models/Documents/Document.interface";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DocsApiService } from "../../../Services/docs/docs-api.service";
import { BaseUrlDocs } from "../../../../GlobalConstanst"; //interface base url service
import { EmailService } from "../../../Services/email/email.service";

@Component({
  selector: 'app-retroalimentacion-bitacora',
  templateUrl: './retroalimentacion-bitacora.component.html',
  styleUrls: ['./retroalimentacion-bitacora.component.css']
})
export class RetroalimentacionBitacoraComponent implements OnInit {
  id: string;
  listBitacoras1: any;
  listBitacoras2: any;
  listBitacoras3: any;
  listBitacoras4: any;
  aprobado = false;
  aprobado2 = false;
  pageActual: number = 1;
  tipoDocumento = false;
  docValido = false;
  aprobado3 = false;
  aprobado4 = false;
  event: any;
  nombreDoc: null;
  file = null;
  numero = 0;
  numero2 = 0;
  numero3 = 0;
  numero4 = 0;

  doc: DocumentI = {};
  modalSwith: boolean = false;
  closeResult = "";
  safeSrc?: SafeResourceUrl;

  constructor(
    private fb: FormBuilder,
    private bitacoraService: BitacoraService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private docApi: DocsApiService,
    private modalService: NgbModal,
    private activerouter: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private emailService: EmailService,

  ) {
    this.id = this.aRoute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.listarBitacorasTipo();
  }
  listarBitacorasTipo() {
    this.numero = 0
    this.numero2 = 0
    this.numero3 = 0
    this.numero4 = 0
    let asignacion_id = this.id;
    this.bitacoraService
      .getBitacorasTipo(1, asignacion_id)
      .subscribe((data) => {
        this.listBitacoras1 = data.results;
        for (let i = 0; i < this.listBitacoras1.length; i++) {
          const element = this.listBitacoras1[i];
          if (element.estado_documento == "Aprobado") {
            this.numero++;
            if (this.numero == 2) {
              this.aprobado = true;
            }
          }
        }
      });
    // lista documento 2
    this.bitacoraService
      .getBitacorasTipo(2, asignacion_id)
      .subscribe((data) => {
        this.listBitacoras2 = data.results;
        for (let i = 0; i < this.listBitacoras2.length; i++) {
          const element = this.listBitacoras2[i];
          if (element.estado_documento == "Aprobado") {
            this.numero2++
            if (this.numero2 == 2) {
              this.aprobado2 = true;
            }
          }
        }
      });
    // lista documento 3
    this.bitacoraService
      .getBitacorasTipo(3, asignacion_id)
      .subscribe((data) => {
        this.listBitacoras3 = data.results;
        for (let i = 0; i < this.listBitacoras3.length; i++) {
          const element = this.listBitacoras3[i];
          if (element.estado_documento == "Aprobado") {
            this.numero3++;
            if (this.numero3 == 2) {
              this.aprobado3 = true;
            }
          }
        }
      });
    this.bitacoraService
      .getBitacorasTipo(4, asignacion_id)
      .subscribe((data) => {
        this.listBitacoras4 = data.results;
        for (let i = 0; i < this.listBitacoras4.length; i++) {
          const element = this.listBitacoras4[i];
          if (element.estado_documento == "Aprobado") {
            this.numero4++;
            if (this.numero4 == 2) {
              this.aprobado4 = true;
            }
          }
        }
      });
  }
  getFile(event): void {
    this.event = event;
    if (event.target.files[0].size <= 2000000) {
      this.nombreDoc = event.target.files[0].name;
      // console.log(this.nombreDoc);
      let exDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf("."));
      if (exDoc == ".pdf") {
        this.file = event.target.files[0];
        Swal.fire({
          // title: "Resolución cargada!",
          title: "Archivo cargado exitosamente!",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "007bb8",
        });
        this.docValido = true;
      } else {
        this.docValido = false;
        this.file = null;
        this.nombreDoc = null;
        Swal.fire({
          title: "Error",
          text: "El archivo cargado no es un pdf",
          icon: "error",
        });
      }
    } else {
      this.docValido = false;
      this.file = null;
      this.nombreDoc = null;
    }
  }
  sendFile(tipo: any) {
    let tipo_seguimiento_id = tipo;
    let asignacion_id = this.id;
    this.bitacoraService
      .sendPost(this.nombreDoc, this.file, tipo_seguimiento_id, asignacion_id)
      .subscribe((data) => {
        if (data.status == "info") {
          Swal.fire({
            title: "question",
            text: data.message,
            icon: "warning",
          });
          this.docValido = false;
          this.file = null;
          this.nombreDoc = null;
          this.listarBitacorasTipo();
        } else if (data.status == "error") {
          Swal.fire({
            title: "Error",
            text: data.message,
            icon: "error",
          });
          this.docValido = false;
          this.file = null;
          this.nombreDoc = null;
          this.listarBitacorasTipo();
        }
        Swal.fire({
          title: "Exitoso!",
          text: data.message,
          icon: "success",
        });
        this.docValido = false;
        this.file = null;
        this.nombreDoc = null;
        this.listarBitacorasTipo();
      });
  }
  cambiarEstadoDoc(estado_documento: string, id_bitacora: number, tipo_seguimiento_id: any) {
    let asignacion_id = this.id;
    Swal.fire({
      title: 'Cambiar estado',
      text: 'Estas seguro que quieres cambiar el estado del documento a ' + estado_documento + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((res) => {
      if (res.isConfirmed) {
        this.bitacoraService.cambiarEstado(asignacion_id, id_bitacora, estado_documento, tipo_seguimiento_id).subscribe(data => {
          if (data.status = 'success') {
            Swal.fire({
              title: 'Estado Actualizado!',
              text: data.message,
              icon: 'success',
            })
            this.listarBitacorasTipo()
            const datos = { estado_documento: estado_documento, id_bitacora: id_bitacora, tipo_seguimiento_id: tipo_seguimiento_id }
            this.bodyVerifyBitacora(datos)
          } else {
            Swal.fire({
              title: 'Error',
              text: data.message,
              icon: 'error',
            })
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

  bodyVerifyBitacora(datos: any) {
    this.emailService.getDadataAprendiz(datos.id_bitacora).subscribe(data => {
      let datosEmail: any
      console.log(data.results);
      if (datos.estado_documento == "Aprobado") {
        datosEmail = {
          tittle: `❗${data.results[0].nombres} acaban de revisar tu bitacora ${data.results[0].tipo_seguimiento}❗ `,
          emailReseptores: [`${data.results[0].correo_misena}`],
          subtitulo: `estado birtacora ${data.results[0].tipo_seguimiento}`,
          // text: `` ,
          html: `
          ✅
          El presente correo es para notificar que se ha Aprobado la bitácora del aprendiz :📚 <br>
          Nombre completo: ${data.results[0].nombres} ${data.results[0].apellidos} <br>
          Identificación:${data.results[0].identificacion}<br>
          Programa de formación : ${data.results[0].programa_id} <br> 
          Ficha de formación:${data.results[0].ficha}<br>
          Teléfono de contacto:${data.results[0].telefono}<br>
          fecha de inicio:${data.results[0].incio_productiva}<br>
          ✅`,
        }
      } else {
        datosEmail = {
          tittle: `❗${data.results[0].nombres} acaban de revisar tu bitacora ${data.results[0].tipo_seguimiento}❗ `,
          emailReseptores: [`${data.results[0].correo_misena}`],
          subtitulo: `estado birtacora ${data.results[0].tipo_seguimiento}`,
          // text: `` ,
          html: `.❌
          El presente correo es para notificar que se ha No se Aprobado  la bitácora del aprendiz :📚 <br>
          Nombre completo: ${data.results[0].nombres} ${data.results[0].apellidos} <br>
          Identificación:${data.results[0].identificacion}<br>
          Programa de formación : ${data.results[0].programa_id} <br> 
          Ficha de formación:${data.results[0].ficha}<br>
          Teléfono de contacto:${data.results[0].telefono}<br>
          fecha de inicio:${data.results[0].incio_productiva}<br>
          ❌`,
        }
      }
      console.log(datosEmail);

      this.emailService.sendEmail(datosEmail).subscribe((data) => { })
    })

  }
}
