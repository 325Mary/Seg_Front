import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { BitacoraService } from "../../../Services/Bitacoras/bitacora.service";
import Swal from "sweetalert2";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { DocumentI } from "./../../../models/Documents/Document.interface";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DocsApiService } from "../../../Services/docs/docs-api.service";
import { BaseUrlDocs } from "../../../../GlobalConstanst"; //interface base url service
import { NotificationService } from "../../../Services/notification/notification.service";
import { AssignmentService } from "../../../Services/assignment/assignment.service";
import { EmailService } from "../../../Services/email/email.service";
import { AprendizService } from "../../../Services/aprendiz/aprendiz.service";

@Component({
  selector: "app-registrar-bitacora",
  templateUrl: "./registrar-bitacora.component.html",
  styleUrls: ["./registrar-bitacora.component.css"],
})
export class RegistrarBitacoraComponent implements OnInit {
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

  datosaprendiz: any

  doc: DocumentI = {};
  modalSwith: boolean = false;
  closeResult = "";
  safeSrc?: SafeResourceUrl;
  usuario_id: string | number;
  nombre_aprendiz: string;

  id_asignacionExist: any;

  constructor(
    private fb: FormBuilder,
    private bitacoraService: BitacoraService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private docApi: DocsApiService,
    private modalService: NgbModal,
    private activerouter: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private notificationapiservice: NotificationService,
    private assignmentapiservice: AssignmentService,
    private emailService: EmailService,
    private aprendizservices: AprendizService,
  ) {
    this.id = this.aRoute.snapshot.paramMap.get("id");
  }

  async ngOnInit() {
    this.existIdAsignacion();
  }

  existIdAsignacion() {
    this.id_asignacionExist =
      sessionStorage.getItem("id_asignacion") == null ||
        sessionStorage.getItem("id_asignacion") == "null"
        ? false
        : true;

    // console.log(sessionStorage.getItem("id_asignacion"));

    if (this.id_asignacionExist) {
      this.listarBitacorasTipo();
    }
  }
  listarBitacorasTipo() {
    this.numero = 0;
    this.numero2 = 0;
    this.numero3 = 0;
    this.numero4 = 0;
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
            this.numero2++;
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
    this.assignmentapiservice.getAssignment(asignacion_id).subscribe((data) => {
      this.usuario_id = data.results.usuario_responsable_id;
      this.nombre_aprendiz =
        data.results.Aprendiz.nombres + " " + data.results.Aprendiz.apellidos;
      this.datosaprendiz = data.results
      this.bitacoraService
      .sendPost(this.nombreDoc, this.file, tipo_seguimiento_id, asignacion_id)
      .subscribe((data) => {
        let body = {
          estado: "Activa",
          notificacion: `🔔El o la aprendiz ${this.nombre_aprendiz} acaba de subir una bitácora 📝`,
          ruta: `retroalimentacion-bitacoras/${asignacion_id}`,
          usuario_id: this.usuario_id,
        };
        const dataemail = { bitacora: data, aprendiz: this.datosaprendiz }
        this.bodyUploadBitacora(dataemail)
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
        } else if (data.status == "success") {
          Swal.fire({
            title: "Exitoso!",
            text: data.message,
            icon: "success",
          });
          this.docValido = false;
          this.file = null;
          this.nombreDoc = null;
          this.listarBitacorasTipo();
          this.notificationapiservice
            .postNotification(body)
            .subscribe((data) => { });
        }
      });
    });
  
  }
  open(content: any, documento_id: any) {
    this.getIdDocumentBitacora1(documento_id);
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
    this.docApi.getDocument(id_docuemnto).subscribe((data: any) => {
      this.doc = data.results;
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
        BaseUrlDocs + this.doc.ruta
      );
    });
  }

  bodyUploadBitacora(datos: any) {
    this.aprendizservices.getProgramsByID(datos.aprendiz.Aprendiz.programa_id).subscribe(programa => {
    const datosEmail = {
  title: `Nueva bitácora subida del aprendiz ${datos.aprendiz.Aprendiz.nombres} ${datos.aprendiz.Aprendiz.apellidos}`,
  emailReceptores: [datos.aprendiz.User.correo_institucional],
  subtitulo: `Nueva bitácora subida por ${datos.aprendiz.Aprendiz.nombres} ${datos.aprendiz.Aprendiz.apellidos}`,
  html: `
    <p>Cordial saludo.</p>
    
    <p>
      El presente correo es para notificar que se ha subido una nueva bitácora de seguimiento 
      de etapa productiva.
    </p>
    
    <section style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #2196F3;">
      <h3 style="margin-top: 0; color: #2196F3;">Información del Aprendiz</h3>
      <p><strong>Nombre completo:</strong> ${datos.aprendiz.Aprendiz.nombres} ${datos.aprendiz.Aprendiz.apellidos}</p>
      <p><strong>Identificación:</strong> ${datos.aprendiz.Aprendiz.identificacion}</p>
      <p><strong>Teléfono de contacto:</strong> ${datos.aprendiz.Aprendiz.telefono}</p>
    </section>
    
    <section style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #9C27B0;">
      <h3 style="margin-top: 0; color: #9C27B0;">Información Académica</h3>
      <p><strong>Programa de formación:</strong> ${programa.results.programa_formacion}</p>
      <p><strong>Ficha de formación:</strong> ${datos.aprendiz.Aprendiz.ficha}</p>
      <p><strong>Fecha de inicio:</strong> ${datos.aprendiz.Aprendiz.incio_productiva}</p>
    </section>
    
    <div style="margin: 20px 0; padding: 15px; background-color: #e8f5e9; border-left: 4px solid #4CAF50;">
      <p style="margin: 0;">
        📋 Por favor, revise la bitácora a la brevedad posible para realizar el seguimiento correspondiente.
      </p>
    </div>
  `
};
      this.emailService.sendEmail(datosEmail).subscribe((data) => { })
    })
  }
}
