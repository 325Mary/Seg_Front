import { Component, OnInit } from '@angular/core';
import { AprendizService } from 'app/Services/aprendiz/aprendiz.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Aprendiz2 } from 'app/models/Aprendiz/aprendiz';
@Component({
  selector: 'app-informacion-aprendiz',
  templateUrl: './informacion-aprendiz.component.html',
  styleUrls: ['./informacion-aprendiz.component.css']
})
export class InformacionAprendizComponent implements OnInit {
  Aprendiz: Aprendiz2
  cambiarFormulario = 0;
  id: string | null;
  constructor(private aprendizService: AprendizService,
    private aRoute: ActivatedRoute
    ) { this.id = this.aRoute.snapshot.paramMap.get('id') }

  ngOnInit(): void {
    this.getDatosAprendiz()
  }
  getDatosAprendiz(){
    this.aprendizService.getDatosAprendiz(this.id).subscribe(data=>{
      this.Aprendiz = data.results[0];
    })
  }
  changeNextForm() {
    this.cambiarFormulario = 1
  }
  changeForm2() {
    this.cambiarFormulario = 0
  }
}
