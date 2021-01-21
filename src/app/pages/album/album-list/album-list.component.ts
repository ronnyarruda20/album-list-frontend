import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { Utils } from 'app/shared/utils/utls';
import { environment } from 'environments/environment';
import { AlbumItemComponent } from '../album-item/album-item.component';
import { AlbumService } from '../album.service';
import { AlbumModel } from './../album.model';

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
  albums = new Array<AlbumModel>();
  placeholders: any;
  albumModel: AlbumModel;
  album: AlbumModel
  file: File;

  @ViewChild('inputFile')
  inputFile: ElementRef;

  constructor(
    private service: AlbumService,
    private sanitizer: DomSanitizer,
    public activatedRoute: ActivatedRoute,
    private dialogService: NbDialogService,
  ) {
    this.activatedRoute.data.subscribe(data => {
      this.baseUrl = environment.api + data.endPoint
    });
  }

  ngOnInit(): void {
    this.loadALbum(this.pageNumber, this.pageSize);
  }

  setPageEvent(pageEvent: PageEvent) {
    this.loadALbum(pageEvent.pageIndex, pageEvent.pageSize)
  }

  private loadALbum(pageNumber: number, pageSize: number) {
    this.service.list(pageNumber, pageSize, this.baseUrl, null)
      .subscribe(res => {
        if (res.contents.length > 0) {
          this.albums = res.contents;
          this.length = res.pageInfo.totalElements;
          this.albums.map(p => p.fileUrl = this.getFileUrl(p.file))
        }
      });
  }

  handleFileInput(event: any) {
 
    this.file = event.target.files.item(0);
    // this.service.file(this.file, String(id), this.baseUrl)
    //   .subscribe(res => {
    //     console.log(res)
    //   });
      this.clearImage();
  }

  loadingAlbum(album: AlbumModel){
    // this.albumModel = album
    console.log(album)
  }

  getFileUrl(file: string) {
    if (Utils.hasValue(file)) {
      return this.sanitizer.bypassSecurityTrustUrl(Utils.converterBlobToUrl(file, 'png'));
    } else {
      return './assets/images/no-image.png';
    }
  }

  openAlbumDialogItem() {
    this.dialogService.open(AlbumItemComponent);
  }

  clearImage() {
    this.inputFile.nativeElement.value = "";
  }



}

