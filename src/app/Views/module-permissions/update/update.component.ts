import { Component, OnInit } from '@angular/core';
import { PerfilesService } from '../../../Services/perfiles/perfiles.service';
import { ItemModuloService } from '../../../Services/item_modulo/item-modulo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponentModulePermiss implements OnInit {

  allPerfiles : any[] = []
  allitemModulos : any[] = []

  constructor(
    private servicePerfil : PerfilesService ,
    private service : PerfilesService ,
  ) { }

  ngOnInit() { }

  getAllPerfiles() {
    this.servicePerfil.allPerfiles().subscribe(data => {
      this.allPerfiles = data.results
    })
  }
  getAllItemModulos() {}

}
