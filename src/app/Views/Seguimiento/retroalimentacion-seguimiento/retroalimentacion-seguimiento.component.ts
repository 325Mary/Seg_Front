import { Aprendiz } from 'app/models/Aprendiz/aprendiz';
import { Component, OnInit } from '@angular/core';
import { SeguimientoService } from '../../../Services/seguimiento.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NotificationService } from "../../../Services/notification/notification.service";
import { AssignmentService } from 'app/Services/assignment/assignment.service';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap"; import { DocumentI } from "./../../../models/Documents/Document.interface";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DocsApiService } from "../../../Services/docs/docs-api.service";
import { BaseUrlDocs } from "../../../../GlobalConstanst"; //interface base url service
import { EmailService } from "../../../Services/email/email.service";


@Component({
  selector: 'app-retroalimentacion-seguimiento',
  templateUrl: './retroalimentacion-seguimiento.component.html',
  styleUrls: ['./retroalimentacion-seguimiento.component.css']
})
export class RetroalimentacionSeguimientoComponent implements OnInit {
  file = null
  pageActual: number = 1
  listDatosAprendiz: any
  listDocumentos: any
  listDocumentos2: any
  listDocumentos3: any
  listDocumentos4: any
  nombreAprendiz = ''
  nombreDoc: null
  aprobado = false
  aprobado2 = false
  aprobado3 = false
  aprobado4 = false
  seguimientoForm: any
  event: any
  tipo = 1
  usuario_responsable = 0
  tipo_de_segumiento = ''
  id: string

  doc: DocumentI = {};
  modalSwith: boolean = false;
  closeResult = "";
  safeSrc?: SafeResourceUrl;

  constructor(private seguiService: SeguimientoService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private asignadoServices: AssignmentService,
    private docApi: DocsApiService,
    private modalService: NgbModal,
    private activerouter: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private notificacionServices: NotificationService,
    private emailService: EmailService,

  ) {
    this.seguimientoForm = this.fb.group({
      tipo_seguimiento_id: [''],
      id: ['', Validators.required]

    })
    this.id = this.aRoute.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.listarDocumentos()

  }


  listarDocumentos() {
    let asignacion_id = this.id
    this.seguiService.getDocumentoSeguimiento(1, asignacion_id).subscribe(data => {
      this.listDocumentos = data.results
      for (let i = 0; i < this.listDocumentos.length; i++) {
        const element = this.listDocumentos[i];
        if (element.estado_documento == 'Aprobado') {
          this.aprobado = true
        }
      }
    })
    this.seguiService.getDocumentoSeguimiento(2, asignacion_id).subscribe(data => {
      this.listDocumentos2 = data.results
      for (let i = 0; i < this.listDocumentos2.length; i++) {
        const element = this.listDocumentos2[i];
        if (element.estado_documento == 'Aprobado') {
          this.aprobado2 = true
        }
      }
    })
    this.seguiService.getDocumentoSeguimiento(3, asignacion_id).subscribe(data => {
      this.listDocumentos3 = data.results
      for (let i = 0; i < this.listDocumentos3.length; i++) {
        const element = this.listDocumentos3[i];
        if (element.estado_documento == 'Aprobado') {
          this.aprobado3 = true
        }
      }
    })
    this.seguiService.getDocumentoSeguimiento(4, asignacion_id).subscribe(data => {
      this.listDocumentos4 = data.results
      for (let i = 0; i < this.listDocumentos4.length; i++) {
        const element = this.listDocumentos4[i];
        if (element.estado_documento == 'Aprobado') {
          this.aprobado4 = true
        }
      }
    }
    )
  }

  cambiarEstadoDoc(estado_documento: string, id_seguimiento: number) {
    const aprobado = 'Aprobado'
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
        this.seguiService.cambiarEstado(id_seguimiento, estado_documento).subscribe(data => {
          if (data.status == 'error') {
            Swal.fire({
              title: 'Error',
              text: data.message,
              icon: 'error',
            })
          } else if (data.code == 'por_Certificar') {
            Swal.fire({
              title: 'Cambio de fase Exitoso',
              text: data.message,
              icon: 'success',
            })
            this.listarDocumentos()
            if (estado_documento == aprobado) {
              this.asignadoServices.getAssignment(this.id).subscribe(data => {
                this.nombreAprendiz = data.results.Aprendiz.nombres
                this.usuario_responsable = data.results.User.id_usuario
                let body = {
                  estado: "Activa",
                  notificacion: `🔔 El aprendiz ${this.nombreAprendiz} ya paso a estado Por Certificar 📗`,
                  ruta: `create-certificacion/${this.id}`,
                  usuario_id: this.usuario_responsable,
                };
                const datosEmail = {
                  tittle: ` Por Certificar 📗   `,
                  emailReseptores: [`${data.results[0].correo_misena}`],
                  subtitulo: `estado birtacora ${data.results[0].tipo_seguimiento}`,
                  // text: `` ,
                  html: `✅el estado de tu bitacora ${data.results[0].tipo_seguimiento} fue  ${data.results} ✅ <br>
                  continua asi con las siguientes bitacoras 📚
                  `,
                }
                this.notificacionServices.postNotification(body).subscribe((data) => { });
                // this.emailService.sendEmail(datosEmail).subscribe((data) => { })

              })
            }
          } else {
            Swal.fire({
              title: 'Cambio de estado Exitoso',
              text: data.message,
              icon: 'success',
            })
            this.listarDocumentos()
            if (estado_documento == aprobado) {
              this.asignadoServices.getAssignment(this.id).subscribe(data => {
                this.usuario_responsable = data.results.User.id_usuario
                this.nombreAprendiz = data.results.Aprendiz.nombres
                let body = {
                  estado: "Activa",
                  notificacion: `🔔 Al aprendiz ${this.nombreAprendiz} se le aprobó un nuevo seguimiento ✔✔`,
                  ruta: `register-seguimiento/${this.id}`,
                  usuario_id: this.usuario_responsable,
                };
                this.notificacionServices.postNotification(body).subscribe((data) => { });
                this.sendEnvioEmailSegAprobado(data)
              })
            } else {
              this.asignadoServices.getAssignment(this.id).subscribe(data => {
                this.usuario_responsable = data.results.User.id_usuario
                this.nombreAprendiz = data.results.Aprendiz.nombres
                let body = {
                  estado: "Activa",
                  notificacion: `🔔 Al aprendiz ${this.nombreAprendiz} no se le aprobó el seguimiento ❌❌`,
                  ruta: `register-seguimiento/${this.id}`,
                  usuario_id: this.usuario_responsable,
                };
                this.notificacionServices.postNotification(body).subscribe((data) => { });
                this.sendEnvioEmailNoAprobado(data)
              })
            }
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
    this.docApi.getDocument(id_docuemnto).subscribe((data: any) => {
      this.doc = data.results;
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
        BaseUrlDocs + this.doc.ruta
      );
    });
  }
  sendEnvioEmailSegAprobado(datos: any) {
   const datosEmail = {
  title: `Seguimiento aprobado - Aprendiz ${datos.results.Aprendiz.nombres} ${datos.results.Aprendiz.apellidos}`,
  emailReceptores: [datos.results.User.correo_institucional],
  subtitulo: `Seguimiento de etapa productiva aprobado`,
  html: `
    <p>Cordial saludo.</p>
    
    <div style="margin: 20px 0; padding: 15px; background-color: #e8f5e9; border-left: 4px solid #4CAF50;">
      <p style="margin: 0;">
        ✅ <strong>Seguimiento aprobado</strong> - El seguimiento de etapa productiva ha sido aprobado 
        y los documentos están listos para certificar.
      </p>
    </div>
    
    <section style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #673AB7;">
      <h3 style="margin-top: 0; color: #673AB7;">Información del Instructor</h3>
      <p><strong>Nombre completo:</strong> ${datos.results.User.nombres} ${datos.results.User.apellidos}</p>
    </section>
    
    <section style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #2196F3;">
      <h3 style="margin-top: 0; color: #2196F3;">Información del Aprendiz</h3>
      <p><strong>Nombre completo:</strong> ${datos.results.Aprendiz.nombres} ${datos.results.Aprendiz.apellidos}</p>
      <p><strong>Identificación:</strong> ${datos.results.Aprendiz.identificacion}</p>
      <p><strong>Teléfono de contacto:</strong> ${datos.results.Aprendiz.telefono}</p>
    </section>
    
    <section style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #9C27B0;">
      <h3 style="margin-top: 0; color: #9C27B0;">Información Académica</h3>
      <p><strong>Ficha de formación:</strong> ${datos.results.Aprendiz.ficha}</p>
      <p><strong>Fecha de inicio:</strong> ${datos.results.Aprendiz.incio_productiva}</p>
    </section>
    
    <div style="margin: 20px 0; padding: 15px; background-color: #e3f2fd; border-left: 4px solid #2196F3;">
      <p style="margin: 0;">
        📋 Puede proceder con el proceso de certificación de la etapa productiva.
      </p>
    </div>
  `
};
    this.emailService.sendEmail(datosEmail).subscribe((data) => { })
  }

  sendEnvioEmailNoAprobado(datos: any) {
    console.log(datos)
 const datosEmail = {
  title: `Seguimiento no aprobado - Aprendiz ${datos.results.Aprendiz.nombres} ${datos.results.Aprendiz.apellidos}`, // ✅ Sin emoji
  emailReceptores: [datos.results.User.correo_institucional],
  subtitulo: `Seguimiento de etapa productiva no aprobado`,
  html: `
    <p>Cordial saludo.</p>
    
    <div style="margin: 20px 0; padding: 15px; background-color: #ffebee; border-left: 4px solid #f44336;">
      <p style="margin: 0;">
        ❌ <strong>Seguimiento no aprobado</strong> - El seguimiento de etapa productiva no ha sido aprobado. 
        Los documentos requieren correcciones antes de certificar.
      </p>
    </div>
    
    <section style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #673AB7;">
      <h3 style="margin-top: 0; color: #673AB7;">Información del Instructor</h3>
      <p><strong>Nombre completo:</strong> ${datos.results.User.nombres} ${datos.results.User.apellidos}</p>
    </section>
    
    <section style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #2196F3;">
      <h3 style="margin-top: 0; color: #2196F3;">Información del Aprendiz</h3>
      <p><strong>Nombre completo:</strong> ${datos.results.Aprendiz.nombres} ${datos.results.Aprendiz.apellidos}</p>
      <p><strong>Identificación:</strong> ${datos.results.Aprendiz.identificacion}</p>
      <p><strong>Teléfono de contacto:</strong> ${datos.results.Aprendiz.telefono}</p>
    </section>
    
    <section style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #9C27B0;">
      <h3 style="margin-top: 0; color: #9C27B0;">Información Académica</h3>
      <p><strong>Ficha de formación:</strong> ${datos.results.Aprendiz.ficha}</p>
      <p><strong>Fecha de inicio:</strong> ${datos.results.Aprendiz.inicio_productiva}</p>
    </section>
    
    <div style="margin: 20px 0; padding: 15px; background-color: #fff3cd; border-left: 4px solid #ffc107;">
      <p style="margin: 0;">
        ⚠️ <strong>Acción requerida:</strong> Por favor, revise las observaciones del instructor, 
        realice las correcciones necesarias en los documentos y vuelva a enviarlos para aprobación.
      </p>
    </div>
  `
};
    this.emailService.sendEmail(datosEmail).subscribe((data) => { })
  }
}
