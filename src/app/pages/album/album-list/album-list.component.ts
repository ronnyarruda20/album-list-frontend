import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { AlbumService } from '../album.service';

@Component({
  selector: 'ngx-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss'],
})
export class AlbumListComponent implements OnInit {

  private baseUrl: string;
  length = 0;
  pageSize = 5;
  pageNumber = 0;
  searchResults: Array<any>;
  placeholders: any;
  fileToUpload: File = null;

  constructor(
    private service: AlbumService,
    private sanitizer: DomSanitizer,
    public activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.data.subscribe(data => {
      this.baseUrl = environment.api + data.endPoint
    });
  }

  ngOnInit(): void {
    this.loadALbum(this.pageNumber, this.pageSize);
  }

  private loadALbum(pageNumber: number, pageSize: number) {
    this.searchResults = [];
    this.placeholders = new Array(pageSize);
    this.service.getAllPaginate(pageNumber, pageSize, this.baseUrl, null)
      .subscribe(res => {
        if (res.contents.length > 0) {
          this.searchResults = res.contents;
          this.length = res.pageInfo.totalElements;
          this.getImage(res.contents);
        }
        this.placeholders = [];
      });
  }

  setPageEvent(pageEvent: PageEvent) {
    this.loadALbum(pageEvent.pageIndex, pageEvent.pageSize)
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload)
  }

  getImage(albums: any) {
    albums.forEach(p => {
      p.forEach(m => {
        if (m.imagem) {
          this.service.getImage(m.imagem, this.baseUrl)
            .subscribe(res => {
              m.file = this.createImageUrl(res);
            });
        } else {
          m.file = './assets/images/album-capa.jpg';
        }
      })
    })
  }


  createImageUrl(data: any) {
    let blob = new Blob([data], { type: "image/png" });
    let url = window.URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }



}

