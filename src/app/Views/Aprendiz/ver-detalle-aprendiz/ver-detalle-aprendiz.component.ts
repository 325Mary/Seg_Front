import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AprendizService } from 'app/Services/aprendiz/aprendiz.service';


@Component({
  selector: 'app-ver-detalle-aprendiz',
  templateUrl: './ver-detalle-aprendiz.component.html',
  styleUrls: ['./ver-detalle-aprendiz.component.css']
})
export class VerDetalleAprendizComponent implements OnInit {
  titulo = "Datos Aprendiz"
  cambiarFormulario = 0;
  detallesAprendiz: [];
  etapaProductiva = [];
  programaAprendiz = "";
  municipioAprendiz = '';
  ciudadEmpresa = '';
  constructor(private dataAprendiz: AprendizService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id: string = params['id'];
      this.getDetalleAprendiz(id);
      this.getEtapaProductiva(id)
    });
  }

  getDetalleAprendiz(id: string): void {
    this.dataAprendiz.getVerDetalleAprendiz(id).subscribe(
      data => {
        this.detallesAprendiz = data.results;
        this.getProgramAprendiz(data.results?.programa_id);
        this.getMunicipioAprendiz(data.results?.municipio_id);
        console.log(this.detallesAprendiz);
      },
      error => {
        console.error('Error al obtener el detalle del aprendiz:', error);
      }
    );
  }
  changeNextForm(): void {
    this.cambiarFormulario = 1
  }
  changeForm2(): void {
    this.cambiarFormulario = 0
  }
  getEtapaProductiva(id: string): void {
    this.dataAprendiz.getEtapaProductiva().subscribe(data => {
      const etapaFilter = data.results.find(item => item.aprendiz_id === id)
      this.getCiudadEmpresa(etapaFilter.ciudad_id)
      this.etapaProductiva = etapaFilter;
    })
  }
  getProgramAprendiz(id: string): void {
    this.dataAprendiz.getProgramaAprendiz().subscribe(data => {
      const programas = data.results.find(progra => progra.id_programa_formacion === id);
      this.programaAprendiz = programas?.programa_formacion;
    })
  }

  getMunicipioAprendiz(id: number): void {
    this.dataAprendiz.getMunicipios().subscribe(data => {
      const muniAprendiz = data.results[0].find(muni => muni.id_municipio === id);
      this.municipioAprendiz = muniAprendiz?.municipio;
    })
  }

  getCiudadEmpresa(id: number): void {
    this.dataAprendiz.getMunicipios().subscribe(data => {
      const muniEmpresa = data.results[0].find(muni => muni.id_municipio === id);
      this.ciudadEmpresa = muniEmpresa?.municipio;
    })
  }
}
