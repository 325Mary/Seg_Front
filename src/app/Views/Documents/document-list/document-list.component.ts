import { DocumentI } from "./../../../models/Documents/Document.interface";
import { DocsApiService } from "./../../../Services/docs/docs-api.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-document-list",
  templateUrl: "./document-list.component.html",
  styleUrls: ["./document-list.component.css"],
})
export class DocumentListComponent implements OnInit {
  pdfs: DocumentI[] = [];
  pageActual: number = 1;


  constructor(private docApi: DocsApiService, private router: Router) {}

  ngOnInit(): void {
    this.docApi.getAllDocuments().subscribe((data) => {
      this.pdfs = data.results;
      // console.log(this.pdfs);
    });
  }

  viewDocument(id: any) {
    this.router.navigate(["view-documet", id]);
  }
}
