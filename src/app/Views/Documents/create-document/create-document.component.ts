import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DocsApiService } from "../../../Services/docs/docs-api.service";
import { Router, ActivatedRoute } from "@angular/router";
import { DocumentI } from "./../../../models/Documents/Document.interface";
import Swal from "sweetalert2";

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: "app-create-document",
  templateUrl: "./create-document.component.html",
  styleUrls: ["./create-document.component.css"],
})
export class CreateDocumentComponent implements OnInit {
  file!: File;

  documentForm = new FormGroup({
    documento: new FormControl("", [Validators.required]),
  });

  constructor(private apiDoc: DocsApiService, private router: Router) {}

  ngOnInit(): void {}

  validarSubidaDelDocumento(event) {
    if (event.target.files[0].size <= 2000000) {
      //5mb tope
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".pdf") {
        this.file = event.target.files[0];
        Swal.fire({
          title: "PDF Cargado!",
          text: "Archivo cargado exitosamente!",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#007bb8",
        });
      } else {
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado no es un PDF!",
          "error"
        );
      }
    } else {
      Swal.fire(
        "Algo salió mal!",
        "El archivo cargado pesa más de 2 MegaBytes!",
        "error"
      );
    }
  }

  postFormDoc(dataForm: DocumentI) {
    // console.log(dataForm);

    if (this.documentForm.valid) {
      this.apiDoc
        .createDocument(dataForm.documento, this.file)
        .subscribe((data) => {
          if (data.status === "success") {
            // this.alert.showSuccesAlert("Documento registrado Correctamente" , "success");
            Swal.fire({
              title: "Documento Registrado!",
              text: "El documento a sido registrado correctamente",
              icon: "success",
            });
            this.router.navigate(["view-documets"]);
          } else {
            Swal.fire({
              position: "top-end",
              title: "Documento no Registrado!",
              text: data.message || "Error indefinido",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
            // this.alert.showErrorAlert()
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
}
