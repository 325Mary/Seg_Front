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
      tittle: `Asignación instructor  ${datos.profesor.nombres}  ${datos.profesor.apellidos} para etapa practica ⚠️ `,
      emailReseptores: [`${datos.aprendiz.correo_misena}`],
      subtitulo: `informacion asignacion etapa pratica`,
      // text: `data del text en cuestion ` ,
      html: `<p> Cordial saludo.</p> <br>
      <section>
            <span>
            El presente correo es para notificar que se ha realizado la asignación del instructor que estará encargado de realizar el seguimiento de la etapa productiva.
            A continuación, se detalla la información del instructor encargado: 
            <br>
            Nombre instructor	: ${datos.profesor.nombres}  ${datos.profesor.apellidos} 
            <br>
            Correo del instructor : ${datos.profesor.correo_institucional} 
            <br>
    	      teléfono de contacto:	${datos.profesor.numero_telefono}
            </span>
          </section>
          <br>
          ⚠️El instructor se comunicará en los próximos 15 días hábiles , 
          <br>
          si pasados estos días no se concreta comunicación, por favor contacte el instructor asignado.⚠️
          ` ,
    }
    this.emailService.sendEmail(datosEmail).subscribe((data) => { })
  }
  bodyEmailInstructor(datos) {
    const datosEmail = {
      tittle: `Nueva asignación de aprendiz  ${datos.aprendiz.nombres}  ${datos.aprendiz.apellidos} ⚠️`,
      emailReseptores: [`${datos.profesor.correo_institucional}`],
      subtitulo: 'informacion asignacion aprendiz para la etapa pratica',
      // text: `se te asigno el aprendiz conun aprendiz`,
      html: `
      <h1> Cordial saludo.</h1> 
      <br>
      <section>
            <span>
            El presente correo es para notificar una nueva asignación de aprendiz para su etapa práctica, la información del aprendiz asignado es la siguiente:
            <br>
            Nombre Aprendiz	: ${datos.aprendiz.nombres}  ${datos.aprendiz.apellidos}
            <br>
            Correo del Aprendiz : ${datos.aprendiz.correo_misena} 
            <br>
    	      Identificación:	${datos.aprendiz.identificacion}
            <br>
    	      Programa de formación:	${datos.aprendiz.programa_formacion}
            <br>
    	      Ficha de formación:	${datos.aprendiz.ficha}
            <br>
    	      Teléfono de contacto:	${datos.aprendiz.telefono}
            <br>
    	      Correo de la empresa:	${datos.aprendiz.correo}
            <br>
    	      dirección de la empresa:	${datos.aprendiz.direccion}
            <br>
    	      modalidad:	${datos.aprendiz.modalidad}
            <br>
    	      fecha de inicio:	${datos.aprendiz.incio_productiva}
            <br>
    	      fecha final:	${datos.aprendiz.incio_productiva}
            </span>
          </section>
          <br>
          ⚠️ Comunica con el parendiz en los siguientes 15 dias habiles  ⚠️, 
          <br>
          ` ,
    }
    this.emailService.sendEmail(datosEmail).subscribe((data) => { })

  }
}
