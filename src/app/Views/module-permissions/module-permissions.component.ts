import { Component, OnInit } from '@angular/core';
import { ItemModuloService } from '../../Services/item_modulo/item-modulo.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-module-permissions',
  templateUrl: './module-permissions.component.html',
  styleUrls: ['./module-permissions.component.css']
})
export class ModulePermissionsComponent implements OnInit {

  itemModulePerfil: any[] = []

  foods: any = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  constructor(
    private serviceItemModule: ItemModuloService,
  ) { }

  ngOnInit() {
    this.getAllItemModulePerfil()
  }

  getAllItemModulePerfil() {
    this.serviceItemModule.getAllItemModulePerfil().subscribe(data => {
      this.itemModulePerfil = data.results
      console.log(data.results);
    })
  }
  deleteItemModuloPerfil(id: any) {
    console.log(id)
    this.serviceItemModule.deleteItemModulePerfil(id).subscribe(data => {
      if (data.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Item Modulo Perfil ELiminado con exito !",
          text: "Usuario registrado exitosamente",
          showConfirmButton: true,
        })
        this.getAllItemModulePerfil()

      } else {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Info',
          text: data.message || "informacion no detectada",
          showConfirmButton: true,
        })
      }
    })
  }
}
