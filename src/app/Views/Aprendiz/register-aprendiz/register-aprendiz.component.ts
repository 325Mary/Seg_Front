import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Aprendiz_re_DTO } from 'app/models/Aprendiz/aprendiz_RE_DTO';
import { AprendizService } from 'app/Services/aprendiz/aprendiz.service';
import { MunicipioService } from 'app/Services/municipio/municipio.service';
import { CentroFormacionService } from '../../../Services/CentroFormacion/centro-formacion.service';
import * as moment from "moment";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register-aprendiz',
  templateUrl: './register-aprendiz.component.html',
  styleUrls: ['./register-aprendiz.component.css']
})
export class RegisterAprendizComponent implements OnInit {
  nombreBoton = 'REGISTRAR'
  titulo = 'Registrar Aprendiz';
  cambiarFormulario = 0;
  id: string | null;
  aprendicesReForm: FormGroup;
  datosFormulario: any
  fecha_condicion = "true"
  fecha_condicion2 = "true"
  fecha_condicion3 = "true"
  fecha_inicio_productiva : any;
  fecha_inicio_p_value= 21
  fecha_termina_contrato_value = 3
  fecha_termina_contrato: any
  fecha_ini = ''
  fecha_ini2 = ''
  fecha_ini3 = ''
  fechadia= 1
  fecha_contrato_inicio:any
  fecha_nacimiento = '2021-01-01'
   centros: any[] = []; 
  municipios : any 
  user_id_centro = sessionStorage.getItem("user_id_centro");
  user_id_perfil = sessionStorage.getItem("user_id_perfil");

  fecha_max= moment().subtract(14, 'y').format()
  listPrograms: any
  listPrograms2: [] = []
  selected = 'option2';
  form: any;
  submitted: boolean;

  constructor(private fb: FormBuilder,
    private route: Router,
    private aprendizService: AprendizService,
    private aRoute: ActivatedRoute ,
    private municipio : MunicipioService ,
    private centroService: CentroFormacionService, 
    ) {
    this.aprendicesReForm = this.fb.group({
      nombres: ['', [Validators.maxLength(25), Validators.required]],
      apellidos: ['', [Validators.maxLength(25), Validators.required]],
      fecha_nacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      discapacidad: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.max(10000000000)]],
      // correo_misena: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      correo_alternativo: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      municipio_nacimiento: ['', Validators.required],
      centro_id: ['', Validators.required],
      programa_id: ['', Validators.required],
      inicio_lectiva: ['', Validators.required],
      incio_productiva: ['', Validators.required],
      contrato_inicio: ['', Validators.required],
      contrato_fin: ['', Validators.required],
      ficha: ['', [Validators.required, Validators.max(10000000000)]],
      identificacion: ['', [Validators.required, Validators.max(10000000000)]],
      // identificacion:['', Validators.required],
      nit_eps: ['', [Validators.required, Validators.max(10000000000)]],
      eps: ['', [Validators.required, Validators.maxLength(50)]],
      nit_arl: ['', [Validators.required, Validators.max(10000000000)]],
      nombre_empresa: ['', [Validators.required, Validators.maxLength(50)]],
      nit_empresa: ['', [Validators.required, Validators.max(10000000000)]],
      ciudad: ['', [Validators.maxLength(25), Validators.required]],
      direccion: ['', [Validators.maxLength(50), Validators.required]],
      telefono_empresa: ['', [Validators.required, Validators.max(10000000000)]],
      correo: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      modalidad: ['', Validators.required],
      observacion: ['', [Validators.required, Validators.maxLength(25)]],
      // representante_legal: ['', [Validators.required, Validators.maxLength(40)]],
      // identificacion_representante: ['', [Validators.required, Validators.max(10000000000)]],
    })

    this.id = this.aRoute.snapshot.paramMap.get('id')
  }

  calcularFechaPredeterminada(): string {
    const fechaActual = new Date();
    const fechaPredeterminada = new Date(
      fechaActual.getFullYear() - 14,
      fechaActual.getMonth(),
      fechaActual.getDate()
    );

    // Formatear la fecha en el formato "YYYY-MM-DD"
    const fechaFormateada = fechaPredeterminada.toISOString().slice(0, 10);

    return fechaFormateada;
  }

  ngOnInit(): void {
    this.editAprendizWithREP()
    this.getPrograms()
    // console.log(moment().subtract(14, 'y').format());
    this.getAllMuunicipios()
    this.getAllCentros()
  }

  getAllMuunicipios () {
    this.municipio.getAllMunicipios().subscribe(municipio => {
    this.municipios = municipio.results[0];
      
    })
  }

  changeNextForm() {
    this.cambiarFormulario = 1
  }
  changeForm2() {
    this.cambiarFormulario = 0
  }
  saveAprendizWithEP() {
    const aprendiz_RE: Aprendiz_re_DTO = {
      nombres: this.aprendicesReForm.get('nombres')?.value,
      apellidos: this.aprendicesReForm.get('apellidos')?.value,
      fecha_nacimiento: this.aprendicesReForm.get('fecha_nacimiento')?.value,
      genero: this.aprendicesReForm.get('genero')?.value,
      discapacidad: this.aprendicesReForm.get('discapacidad')?.value,
      telefono: this.aprendicesReForm.get('telefono')?.value,
      // correo_misena: this.aprendicesReForm.get('correo_misena')?.value,
      correo_alternativo: this.aprendicesReForm.get('correo_alternativo')?.value,
      municipio_id: this.aprendicesReForm.get('municipio_nacimiento')?.value,
      id_centro_formacion: this.aprendicesReForm.get('centro')?.value,
      programa_id: this.aprendicesReForm.get('programa_id')?.value,
      inicio_lectiva: this.aprendicesReForm.get('inicio_lectiva')?.value,
      incio_productiva: this.aprendicesReForm.get('incio_productiva')?.value,
      contrato_inicio: this.aprendicesReForm.get('contrato_inicio')?.value,
      contrato_fin: this.aprendicesReForm.get('contrato_fin')?.value,
      ficha: this.aprendicesReForm.get('ficha')?.value,
      identificacion: this.aprendicesReForm.get('identificacion')?.value,
      nit_eps: this.aprendicesReForm.get('nit_eps')?.value,
      eps: this.aprendicesReForm.get('eps')?.value,
      nit_arl: this.aprendicesReForm.get('nit_arl')?.value,
      nombre_empresa: this.aprendicesReForm.get('nombre_empresa')?.value,
      nit_empresa: this.aprendicesReForm.get('nit_empresa')?.value,
      ciudad_id: this.aprendicesReForm.get('ciudad')?.value,
      direccion: this.aprendicesReForm.get('direccion')?.value,
      telefono_empresa: this.aprendicesReForm.get('telefono_empresa')?.value,
      correo: this.aprendicesReForm.get('correo')?.value,
      modalidad: this.aprendicesReForm.get('modalidad')?.value,
      observacion: this.aprendicesReForm.get('observacion')?.value,
      // representante_legal: this.aprendicesReForm.get('representante_legal')?.value,
      // identificacion_representante: this.aprendicesReForm.get('identificacion_representante')?.value,
    }
    console.log(this.aprendicesReForm);
    
    // console.log(typeof(aprendiz_RE.contrato_inicio));
    // let algo = new Date(aprendiz_RE.contrato_inicio)z
    // console.log(typeof(algo));
    // console.log(algo);
    // console.log(aprendiz_RE.contrato_fin);


    if (this.id !== null) {
      // edita
      if (this.aprendicesReForm.valid) {
        this.aprendizService.editAprendizWithREP(this.id, aprendiz_RE).subscribe((data: any) => {
          if (data.status == 'success') {
            Swal.fire({
              title: 'Aprendiz Actualizado',
              text: 'Los datos del aprendiz fueron actualizados correctamente',
              icon: 'success',
            })
          }
          this.route.navigate(['/list-aprendices'])

        })
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Campos Incompletos',
          text: "Por favor llena todos los campos correctamente",
          showConfirmButton: true,
        })
      }

    } else {
      if (this.aprendicesReForm.valid) {
        this.aprendizService.saveAprendizWithREP(aprendiz_RE).subscribe((data: any) => {
          if (data.status == 'error') {
            Swal.fire({
              title: 'Error',
              text: 'El aprendiz ya esta registrado',
              icon: 'error',
            })
          } else {
            Swal.fire({
              icon: 'success',
              title: 'El aprendiz fue registrado con exito',
              showConfirmButton: false,
            })
            this.route.navigate(['/list-aprendices'])
          }
        }, error => {
          // console.log(error);
          this.aprendicesReForm.reset();
        })
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Campos Incompletos',
          text: "Por favor llena todos los campos correctamente",
          showConfirmButton: true,
        })
      }

    }

  }
  editAprendizWithREP() {
    if (this.id !== null) {
      this.titulo = 'Editar';
      this.nombreBoton = 'EDITAR';
      this.aprendizService.getAprendizWithREP(this.id).subscribe(data => {
        console.log('data de aprendiz',data);
        
        this.aprendicesReForm.setValue({
          nombres: data.dataValues.nombres,
          apellidos: data.dataValues.apellidos,
          fecha_nacimiento: data.dataValues.fecha_nacimiento,
          genero: data.dataValues.genero,
          discapacidad: data.dataValues.discapacidad,
          telefono: data.dataValues.telefono,
          // correo_misena: data.dataValues.correo_misena,
          correo_alternativo: data.dataValues.correo_alternativo,
          municipio_nacimiento: data.dataValues.municipio_nacimiento,
          centro: data.dataValues.centro,
          programa_id: data.dataValues.programa_id,
          inicio_lectiva: data.dataValues.inicio_lectiva,
          incio_productiva: data.dataValues.incio_productiva,
          contrato_inicio: data.dataValues.contrato_inicio,
          contrato_fin: data.dataValues.contrato_fin,
          ficha: data.dataValues.ficha,
          identificacion: data.dataValues.identificacion,
          nit_eps: data[0].nit_eps,
          eps: data[0].eps,
          nit_arl: data[0].nit_arl,
          nombre_empresa: data[0].nombre_empresa,
          nit_empresa: data[0].nit_empresa,
          ciudad: data[0].ciudad,
          direccion: data[0].direccion,
          telefono_empresa: data[0].telefono,
          correo: data[0].correo,
          modalidad: data[0].modalidad,
          observacion: data[0].observacion,
          // representante_legal: data[0].representante_legal,
          // identificacion_representante: data[0].identificacion_representante,
        })
        // console.log('hola',this.aprendicesReForm.value.telefono);
        
      })
    }
  }
  getPrograms() {
    this.aprendizService.getPrograms().subscribe(data => {
      this.listPrograms = data.results
      this.listPrograms2 = data.results.tipo_programa
    })
  }
  validarFechas() {
    if (this.aprendicesReForm.get("contrato_inicio").value != null) {
      this.fecha_condicion = "false"
      this.fecha_ini = this.aprendicesReForm.get(
        "contrato_inicio"
      ).value;
      this.fecha_termina_contrato = moment(this.fecha_ini)
      .add(this.fecha_termina_contrato_value, "months")
        .toDate();
    }
    
  }
  

  validarFechasLectivas() {
    if (this.aprendicesReForm.get("inicio_lectiva").value != null) {
      this.fecha_condicion2 = "false"
      this.fecha_ini2 = this.aprendicesReForm.get(
        "inicio_lectiva"
      ).value;
      this.fecha_inicio_productiva = moment(this.fecha_ini2)
      .add(this.fecha_inicio_p_value, "months")
        .toDate();
        
    }
  }
  validarFecha2(){
    if (this.aprendicesReForm.get("incio_productiva").value != null) {
      this.fecha_condicion3 = "false"
      this.fecha_ini3 = this.aprendicesReForm.get(
        "incio_productiva"
      ).value;
      this.fecha_contrato_inicio = moment(this.fecha_ini3)
      .add(this.fechadia, "days")
        .toDate();
    }
  }
   getAllCentros() {
    this.centroService.getcentroFormacion(this.user_id_centro, this.user_id_perfil).subscribe((response: any) => {
      this.centros = response.results;
    });
  }

}
