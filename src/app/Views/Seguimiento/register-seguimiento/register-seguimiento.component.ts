import { Component, OnInit } from '@angular/core';
import { SeguimientoService } from '../../../Services/seguimiento.service';
import { AssignmentService } from '../../../Services/assignment/assignment.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap"; import { DocumentI } from "./../../../models/Documents/Document.interface";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DocsApiService } from "../../../Services/docs/docs-api.service";
import { BaseUrlDocs } from "../../../../GlobalConstanst"; //interface base url service
import { NotificationService } from 'app/Services/notification/notification.service';
import { UsersService } from 'app/Services/Users/users.service';
import { EmailService } from 'app/Services/email/email.service';

@Component({
  selector: 'app-register-seguimiento',
  templateUrl: './register-seguimiento.component.html',
  styleUrls: ['./register-seguimiento.component.css']
})
export class RegisterSeguimientoComponent implements OnInit {
  file = null
  pageActual: number = 1
  tipoDocumento = false
  docValido = false
  listDatosAprendiz: any
  listDocumentos: any
  listDocumentos2: any
  listDocumentos3: any
  listDocumentos4: any
  usuario_responsable = 0
  nombreAprendiz = ''
  nombreDoc: null
  aprobado = false
  aprobado2 = false
  aprobado3 = false
  aprobado4 = false
  seguimientoForm: any
  event: any
  tipo = 1
  tipo_de_segumiento = ''
  id: string
  assignment:any;


  doc: DocumentI = {};
  modalSwith: boolean = false;
  closeResult = "";
  safeSrc?: SafeResourceUrl;

  constructor(private seguiService: SeguimientoService,
    private assigmentService: AssignmentService,
    private fb: FormBuilder,
    private router: Router,
    private asignadoServices: AssignmentService,
    private aRoute: ActivatedRoute,
    private docApi: DocsApiService,
    private modalService: NgbModal,
    private activerouter: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private usuarioServices: UsersService,
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
    // this.verifyBitacoras(this.id)
  }
  getFile(event): void {
    this.event = event
    if (event.target.files[0].size <= 2000000) {
      this.nombreDoc = event.target.files[0].name
      // console.log(this.nombreDoc);
      let exDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf('.'))
      if (exDoc == ".pdf") {
        this.file = event.target.files[0]
        Swal.fire({
          // title: "Resolución cargada!",
          title: "Archivo cargado exitosamente!",
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
          text: "El archivo cargado no es un pdf",
          icon: "error",
        })
      }
    } else {
      this.docValido = false;
      this.file = null;
      this.nombreDoc = null
    }
  }
  listarDocumentos() {
    let asignacion_id = this.id
    this.seguiService.getDocumentoSeguimiento(1, asignacion_id).subscribe(data => {
      this.listDocumentos = data.results
      this.nombreAprendiz = data.results[0].nombres


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
  sendFile(tipo: any) {
    let tipo_seguimiento_id = tipo
    let asignacion_id = this.id
    this.seguiService.verifyBitacorasTipo(asignacion_id, tipo_seguimiento_id).subscribe(data => {
      if (data.status == 'error') {
        Swal.fire({
          title: 'Error',
          text: data.message,
          icon: 'error',
        })
        this.docValido = false;
        this.file = null;
        this.nombreDoc = null
        this.listarDocumentos()
      } else {
        this.seguiService.sendPost(this.nombreDoc, this.file, tipo_seguimiento_id, asignacion_id)
          .subscribe(data => {
            const datapost = data
            if (data.status == 'success') {
              Swal.fire({
                title: 'Exitoso!',
                text: data.message,
                icon: 'success',
              })
              this.usuarioServices.allUsersAdmins().subscribe(data => {
                let listAdmins = data.results
                for (let i = 0; i < listAdmins.length; i++) {
                  this.usuario_responsable = listAdmins[i].id_usuario
                  let body = {
                    estado: "Activa",
                    notificacion: `🔔 Se subió un nuevo seguimiento al aprendiz ${this.nombreAprendiz} 📝`,
                    ruta: `retroalimentacion/${this.id}`,
                    usuario_id: this.usuario_responsable,
                  };
                  //puto el que lo lea 
                  this.notificacionServices.postNotification(body).subscribe((data) => { });
                }
                this.bodysendEmailSeguimiento(data , datapost)
              })
              this.docValido = false;
              this.file = null;
              this.nombreDoc = null
              this.listarDocumentos()
            } else {
              Swal.fire({
                title: 'Error',
                text: data.message,
                icon: 'error',
              })
              this.docValido = false;
              this.file = null;
              this.nombreDoc = null
            }
          })

      }
    }
      , err => {
        Swal.fire({
          title: 'Error',
          text: 'Hay un error de servidor',
          icon: 'error',
        });
        this.nombreDoc = null
        this.docValido = false;
        this.file = null;
      }
    )
  }



  cambiarEstadoDoc(estado_documento: string, id_seguimiento: number) {

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

          if (data.status == "error") {
            Swal.fire({
              title: 'Error',
              text: data.message,
              icon: 'error',
            }
            )
            this.listarDocumentos()

          } else {
            Swal.fire({
              title: 'Error',
              text: data.message,
              icon: 'error',
            }
            )
            this.listarDocumentos()
          }
        })

      }
    })
  }
  colorEstado(info: string) {
    if (info == 'Aprobado') {
      return "textoVerde"
    } else if (info == 'No aprobado') {
      return "texto rojo"
    }
  }
  verifyBitacoras(id_asignacion: any) {
    this.seguiService.verifyBitacoras(id_asignacion).subscribe(data => {
      if (data.status == 'error') {
        Swal.fire({
          title: 'Error',
          text: data.message,
          icon: 'warning',
        }
        )
        this.router.navigate(["list-my-assignments"])
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

  bodysendEmailSeguimiento(datos: any , infoDoc : any ) {
    let emailusers = []
    this.usuarioServices.getAllusers().subscribe(users => {
      for (const user of users.results) {
        if (user.perfil_id == '3') {
          emailusers.push(user.correo_institucional)
        }
      }


      this.asignadoServices.getAssignment(this.id).subscribe(asignacion => {
        if (asignacion.status == 'success') {
          this.assignment = asignacion.results
          console.log(this.assignment);
          const datosEmail = {
            tittle: `Nuevo seguimiento subido por el instructor ${this.assignment.User.nombres} ${this.assignment.User.apellidos} `,
            emailReseptores: emailusers,
            subtitulo: `info del seguimiento subido por el ${this.assignment.User.nombres} ${this.assignment.User.apellidos} `,
            // text: `` ,
            html: `
            El presente correo es para notificar que se ha subido el seguimiento del aprendiz.
            Nombre completo del instructor: ${this.assignment.User.nombres} ${this.assignment.User.apellidos} <br> 
            Nombre completo del aprendiz: ${this.assignment.Aprendiz.nombres} ${this.assignment.Aprendiz.apellidos}  <br>
            Identificación: ${this.assignment.Aprendiz.identificacion} <br>
            Ficha de formación: ${this.assignment.Aprendiz.ficha} <br>
            Teléfono de contacto: ${this.assignment.Aprendiz.telefono} <br>
            fecha de inicio: ${this.assignment.Aprendiz.incio_productiva} <br>
            `
          }
          this.emailService.sendEmail(datosEmail).subscribe((data) => { })
          
        }
      })
        

      

      
      
    })
  }
}
