import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbSearchService } from '@nebular/theme';
import { PageInfo } from 'app/shared/model/pagination.model';
import { Utils } from 'app/shared/utils/utls';
import { AlbumItemComponent } from '../album-item/album-item.component';
import { AlbumService } from '../album.service';
import { AlbumModel } from './../album.model';

@Component({
  selector: 'ngx-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss'],
})
export class AlbumListComponent implements OnInit {

  pagInfo = new PageInfo
  loadingShow: boolean = true
  albums = new Array<AlbumModel>();
  searchTerm: string = null;

  constructor(
    private service: AlbumService,
    private sanitizer: DomSanitizer,
    public activatedRoute: ActivatedRoute,
    private searchService: NbSearchService,
    private dialogService: NbDialogService,
  ) {

  }

  ngOnInit(): void {
    this.loadALbum(this.pagInfo.pageNumber, this.pagInfo.pageSize);
    this.loadSearch();
  }

  setPageEvent(pageEvent: PageEvent) {
    this.loadALbum(pageEvent.pageIndex, pageEvent.pageSize, this.searchTerm)
  }

  loadSearch() {
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.pagInfo = new PageInfo
        this.searchTerm = data.term;
        this.loadALbum(0, 5, this.searchTerm);
      })
  }

  clearSearch() {
    if (this.searchTerm) {
      this.searchTerm = null;
      // this.pagInfo = new 
      this.loadALbum(0, 5, this.searchTerm);
    }
  }

  private loadALbum(pageNumber: number, pageSize: number, searchTerm?: string) {
    this.loadingShow = true
    this.service.list(pageNumber, pageSize, searchTerm)
      .subscribe(res => {
        this.albums = res.contents;
        this.pagInfo = res.pageInfo
        this.loadingShow = false
        if (res.contents.length > 0) {
          this.albums.map(p => p.fileUrl = this.getFileUrl(p.file))
        }
      });
  }

  getFileUrl(file: string) {
    if (Utils.hasValue(file)) {
      return this.sanitizer.bypassSecurityTrustUrl(Utils.converterBlobToUrl(file, 'png'));
    } else {
      return './assets/images/no-image.png';
    }
  }

  openAlbumItemDialog(albumModel: AlbumModel) {
    let newAlbumModel = albumModel ? Object.assign(AlbumModel, albumModel) : null;
    this.dialogService.open(AlbumItemComponent, {
      context: {
        albumModel: newAlbumModel
      },
      closeOnBackdropClick: false,
    }).onClose.subscribe(res => {
      if (res) {
        this.loadALbum(this.pagInfo.pageNumber, this.pagInfo.pageSize);
      }
    });
  }

  openAddAlbumItemDialog() {
    this.openAlbumItemDialog(null)
  }

}

