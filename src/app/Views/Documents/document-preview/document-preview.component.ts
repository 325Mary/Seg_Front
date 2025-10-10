import { Component, OnInit } from "@angular/core";
import { DocumentI } from "./../../../models/Documents/Document.interface";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from "@angular/router";
import { DocsApiService } from "../../../Services/docs/docs-api.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { BaseUrlDocs } from "../../../../GlobalConstanst"; //interface base url service

@Component({
  selector: "app-document-preview",
  templateUrl: "./document-preview.component.html",
  styleUrls: ["./document-preview.component.css"],
})
export class DocumentPreviewComponent implements OnInit {
  doc: DocumentI = {};
  modalSwith: boolean = false;
  closeResult = "";
  safeSrc?: SafeResourceUrl;

  constructor(
    private docApi: DocsApiService,
    private modalService: NgbModal,
    private activerouter: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    let id_documento = this.activerouter.snapshot.paramMap.get("id_documento");

    this.docApi.getDocument(id_documento).subscribe((data: any) => {
      this.doc = data.results;
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
        BaseUrlDocs + this.doc.ruta
      );
    });
  }

  open(content: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: "modal-basic-title",
        size: "lg",
        centered: true,
        scrollable: true,
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
