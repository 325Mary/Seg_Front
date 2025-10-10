import { Component, OnInit } from '@angular/core';
import { AssignmentI2 } from 'app/models/Assignments/Assignment.interface';
import { certificacion } from 'app/models/Certificacion/certificacion.ibterface';
import { CertificacionService } from 'app/Services/certificacion/certificacion.service';

@Component({
  selector: 'app-list-aprendices-por-certificar',
  templateUrl: './list-aprendices-por-certificar.component.html',
  styleUrls: ['./list-aprendices-por-certificar.component.css']
})
export class ListAprendicesPorCertificarComponent implements OnInit {

  constructor( private certificacionServices: CertificacionService) { }
  pageActual: number = 1;
  ListAprendicesPC?:certificacion[] = []; 

  ngOnInit(): void {
    this.getAprendicesPC()
  }
  getAprendicesPC(){
    this.certificacionServices.getAllPorCertificar().subscribe(data=>{
      this.ListAprendicesPC = data.results
      // console.log(this.ListAprendicesPC);
    })
  }
}
