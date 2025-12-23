import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Aprendiz } from "../../../models/Aprendiz/aprendiz";
import { AssignmentService } from "../../../Services/assignment/assignment.service";
import { EmailService } from "../../../Services/email/email.service";
import { NotificationService } from "../../../Services/notification/notification.service";
import { User } from "../../../models/users/user.interface";
import { AssignmentI } from "../../../models/Assignments/Assignment.interface";
import { UsersService } from "../../../Services/Users/users.service";
import { AprendizService } from "../../../Services/aprendiz/aprendiz.service";
import Swal from "sweetalert2";
import * as moment from "moment";

@Component({
  selector: "app-create-assignment",
  templateUrl: "./create-assignment.component.html",
  styleUrls: ["./create-assignment.component.css"],
})
export class CreateAssignmentComponent implements OnInit {
  id_aprendiz = this.activerouter.snapshot.paramMap.get("id_aprendiz");

  aprendiz: Aprendiz = {};
  usuarios: User[];

  fecha_1 = "true";
  fecha_2 = "true";
  fecha_3 = "true";

  fecha_11: any;
  fecha_22: any;
  fecha_33: any;

  fecha_primer_seguimiento: number = 90;
  fecha_segundo_seguimiento: number = 170;
  fecha_ultimo_seguimiento: number = 170;

  fecha_seg_parcial: any;
  fecha_seg_final: any;
  fecha_eva_final: any;
    user_id_centro = sessionStorage.getItem("user_id_centro");
  user_id_perfil = sessionStorage.getItem("user_id_perfil");

  assignmentForm = new FormGroup({
    aprendiz_id: new FormControl(parseInt(this.id_aprendiz)),
    fecha_seguimiento_inicial: new FormControl("", [Validators.required]),
    fecha_seguimiento_parcial: new FormControl("", [Validators.required]),
    fecha_seguimiento_final: new FormControl("", [Validators.required]),
    fecha_evaluacion_final: new FormControl("", [Validators.required]),
    estado_fase_id: new FormControl(2),
    usuario_responsable_id: new FormControl("", [Validators.required]),
    novedad_id: new FormControl(1),
  });

  constructor(
    private activerouter: ActivatedRoute,
    private router: Router,
    private assignmentapiservice: AssignmentService,
    private notificationapiservice: NotificationService,
    private emailService: EmailService,
    private serviceUsers: UsersService,
    private serviceAprendiz: AprendizService,
  ) { }

  ngOnInit(): void {
    this.getVerifyAssigment(this.id_aprendiz);
    this.getAprendiz(this.id_aprendiz);
    this.getDataForm();
    this.getVerifyAprendiz(this.id_aprendiz);
  }
  getVerifyAprendiz(aprendiz_id: any) {
    this.assignmentapiservice.verifyAprendiz(aprendiz_id).subscribe((data) => {
      if (data.status != "success") {
        Swal.fire({
          title: "Error",
          text: data.message,
          icon: "warning",
        });

        // setTimeout(() => {
        this.router.navigate(["list-aprendices"]);
        // }, 2000);
      }
    });
  }
  getVerifyAssigment(aprendiz_id: any) {
    this.assignmentapiservice
      .getVerifyAssigment(aprendiz_id)
      .subscribe((data) => {
        if (data.status != "success") {
          Swal.fire({
            title: "Aprendiz Asignado",
            text: data.message,
            icon: "warning",
          });

          // setTimeout(() => {
          this.router.navigate(["list-aprendices"]);
          // }, 2000);
        }
      });
  }

  getAprendiz(id_aprendiz) {
    this.assignmentapiservice
      .getAprendiz(id_aprendiz)
      .subscribe((data: any) => {
        this.aprendiz = data.results;
      });
  }

  getDataForm() {
    this.assignmentapiservice.getDataForm(this.user_id_centro,this.user_id_perfil).subscribe((data) => {
      if (data.status != "success") {
        Swal.fire({
          title: "Error",
          text: "Hay un error de servidor",
          icon: "error",
        });
      }
      this.usuarios = data.results.usuarios;
    });
  }

  postForm(dataForm: AssignmentI) {
    if (this.assignmentForm.valid) {
      this.assignmentapiservice.postAssignment(dataForm).subscribe((data) => {

        if (data.status == "info") {
          Swal.fire({
            title: "Inconsistencia en los datos",
            text: data.message,
            icon: "error",
          });
        }
        let body = {
          estado: "Activa",
          notificacion: "Tienes una nueva asignacion",
          ruta: "list-my-assignments",
          usuario_id: data.results.usuario_responsable_id,
        };
        if (data.status == "success") {
          this.EnviarEmail(data).then(datos => {
            // console.log(datos);
            this.bodyEmailAprendiz(datos)
            this.bodyEmailInstructor(datos)
          })

          this.notificationapiservice.postNotification(body).subscribe((data) => { });
          this.router.navigate(["list-aprendices"]);

          Swal.fire({
            title: "Aprendiz Asignado",
            text: "Aprendiz Asignado Correctamente",
            icon: "success",
          });
        } else if (data.status == "error") {
          Swal.fire({
            title: "Inconsistencia en los datos",
            text: data.message,
            icon: "error",
          });
        }
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Todos los campos son obligatorios",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  validarFechas() {
    if (this.assignmentForm.get("fecha_seguimiento_inicial").value != null) {
      this.fecha_11 = this.assignmentForm.get(
        "fecha_seguimiento_inicial"
      ).value;
      this.fecha_seg_parcial = moment(this.fecha_11)
        .add(this.fecha_primer_seguimiento, "days")
        .toDate();
      this.fecha_22 = this.fecha_seg_parcial;
      this.assignmentForm
        .get("fecha_seguimiento_parcial")
        .setValue(this.fecha_22);
      this.fecha_seg_final = moment(this.fecha_11)
        .add(this.fecha_segundo_seguimiento, "days")
        .toDate();
      this.fecha_33 = this.fecha_seg_final;
      this.assignmentForm
        .get("fecha_seguimiento_final")
        .setValue(this.fecha_33);
      // this.fecha_eva_final = moment(this.fecha_11)
      //   .add(this.fecha_ultimo_seguimiento, "days")
      //   .toDate();
      // this.assignmentForm
      //   .get("fecha_evaluacion_final")
      //   .setValue(this.fecha_eva_final);
      this.fecha_1 = "false";
      this.fecha_2 = "false";
      this.fecha_3 = "false";
    } else {
      this.fecha_1 = "true";
      this.fecha_2 = "true";
      this.fecha_3 = "true";
    }
  }

  async EnviarEmail(data: any) {
    return new Promise(resolved => {
      this.serviceUsers.getsimgleUser(data.results.usuario_responsable_id).subscribe(profesor => {
        this.serviceAprendiz.aprendizByID(data.results.aprendiz_id).subscribe(aprendiz => {
          resolved({ aprendiz: aprendiz.results[0], profesor: profesor.results })
        })
      })
    })
  }

  bodyEmailAprendiz(datos) {
  const datosEmail = {
  title: `Asignación de instructor ${datos.profesor.nombres} ${datos.profesor.apellidos} para etapa práctica ⚠️`,
  emailReceptores: [datos.aprendiz.correo_misena],
  subtitulo: 'Información asignación etapa práctica',
  html: `
    <p>Cordial saludo.</p>
    
    <p>
      El presente correo es para notificar que se ha realizado la asignación del instructor 
      que estará encargado de realizar el seguimiento de la etapa productiva.
    </p>
    
    <p>A continuación, se detalla la información del instructor encargado:</p>
    
    <section style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #4CAF50;">
      <p><strong>Nombre del instructor:</strong> ${datos.profesor.nombres} ${datos.profesor.apellidos}</p>
      <p><strong>Correo del instructor:</strong> ${datos.profesor.correo_institucional}</p>
      <p><strong>Teléfono de contacto:</strong> ${datos.profesor.numero_telefono}</p>
    </section>
    
    <div style="margin: 20px 0; padding: 15px; background-color: #fff3cd; border-left: 4px solid #ffc107;">
      <p style="margin: 0;">
        ⚠️ <strong>Importante:</strong> El instructor se comunicará en los próximos 15 días hábiles. 
        Si pasados estos días no se concreta comunicación, por favor contacte al instructor asignado.
      </p>
    </div>
  `
};
    this.emailService.sendEmail(datosEmail).subscribe((data) => { })
  }
  bodyEmailInstructor(datos) {
    console.log( 'datos instructor', datos);
    const datosEmail = {
  title: `Nueva asignación de aprendiz ${datos.aprendiz.nombres} ${datos.aprendiz.apellidos} ⚠️`,
  emailReceptores: [datos.profesor.correo_institucional],
  subtitulo: 'Información asignación aprendiz para la etapa práctica',
  html: `
    <p>Cordial saludo.</p>
    
    <p>
      El presente correo es para notificar una nueva asignación de aprendiz para su etapa práctica. 
      La información del aprendiz asignado es la siguiente:
    </p>
    
    <section style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #2196F3;">
      <h3 style="margin-top: 0; color: #2196F3;">Información del Aprendiz</h3>
      <p><strong>Nombre:</strong> ${datos.aprendiz.nombres} ${datos.aprendiz.apellidos}</p>
      <p><strong>Identificación:</strong> ${datos.aprendiz.identificacion}</p>
      <p><strong>Correo MISENA:</strong> ${datos.aprendiz.correo_misena}</p>
      <p><strong>Teléfono de contacto:</strong> ${datos.aprendiz.telefono}</p>
    </section>
    
    <section style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #9C27B0;">
      <h3 style="margin-top: 0; color: #9C27B0;">Información Académica</h3>
      <p><strong>Programa de formación:</strong> ${datos.aprendiz.programa_formacion}</p>
      <p><strong>Ficha de formación:</strong> ${datos.aprendiz.ficha}</p>
      <p><strong>Modalidad:</strong> ${datos.aprendiz.modalidad}</p>
    </section>
    
    <section style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #FF9800;">
      <h3 style="margin-top: 0; color: #FF9800;">Información de la Empresa</h3>
      <p><strong>Correo de la empresa:</strong> ${datos.aprendiz.correo}</p>
      <p><strong>Dirección de la empresa:</strong> ${datos.aprendiz.direccion}</p>
    </section>
    
    <section style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #4CAF50;">
      <h3 style="margin-top: 0; color: #4CAF50;">Periodo de Etapa Productiva</h3>
      <p><strong>Fecha de inicio:</strong> ${datos.aprendiz.incio_productiva}</p>
      <p><strong>Fecha de finalización:</strong> ${datos.aprendiz.fin_productiva}</p>
    </section>
    
    <div style="margin: 20px 0; padding: 15px; background-color: #fff3cd; border-left: 4px solid #ffc107;">
      <p style="margin: 0;">
        ⚠️ <strong>Importante:</strong> Por favor, comuníquese con el aprendiz en los próximos 15 días hábiles.
      </p>
    </div>
  `
};
    this.emailService.sendEmail(datosEmail).subscribe((data) => { })

  }
}
