import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from 'app/Services/assignment/assignment.service';
import { AssignmentNovedad } from '../../../models/Assignments/Assignment.interface';
import Swal from 'sweetalert2';
import { Aprendiz } from 'app/models/Aprendiz/aprendiz';
import { AprendizService } from '../../../Services/aprendiz/aprendiz.service';
@Component({
  selector: 'app-register-novedad',
  templateUrl: './register-novedad.component.html',
  styleUrls: ['./register-novedad.component.css']
})
export class RegisterNovedadComponent implements OnInit {
  asignacionForm: FormGroup;
  listTipoNovedad : any
  Aprendiz: Aprendiz
  id: string | null;
  constructor(private fb: FormBuilder,
    private route: Router,
    private aprendizService : AprendizService,
    private assigmentService:AssignmentService,
    private aRoute: ActivatedRoute) { 
      this.asignacionForm = this.fb.group({
      novedad_id :['',Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id')}

  ngOnInit(): void {
    this.getNovedades();
    this.getDatosAprendiz()
  }
  getNovedades(){
    this.assigmentService.listNovedades().subscribe(data=>{
      this.listTipoNovedad = data.results
      
    })
  }
  saveNovedad(id_asignacion:number){
    const asig_Novedad : AssignmentNovedad={
      novedad_id: this.asignacionForm.get('novedad_id')?.value,
    }
    // console.log(id_asignacion);
    
    this.assigmentService.saveNovedad(asig_Novedad, id_asignacion).subscribe(data=>{
      if(data.status == 'success'){
        Swal.fire({
          title:'Novedad Registrada!',
          text:'La novedad fue registrada correctamente',
          icon:'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        })
        this.route.navigate(['/list-my-assignments'])
          // this.toastr.info('La novedad fue registrada con exito', 'Registro');
      }else{
        Swal.fire({
          title:'Escoger otra novedad',
          text:data.message,
          icon:'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        })
      }
    
    })
  }
  getDatosAprendiz(){
    this.aprendizService.getDatosAprendiz(this.id).subscribe(data=>{
      this.Aprendiz = data.results[0];
    })
  }
}
