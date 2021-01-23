import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { PageInfo } from 'app/shared/model/pagination.model';
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
  pagInfo = new PageInfo
  loadingShow: boolean = true
  albums = new Array<AlbumModel>();

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
    this.loadingShow = true
    this.service.list(pageNumber, pageSize, this.baseUrl, null)
      .subscribe(res => {
        if (res.contents.length > 0) {
          this.albums = res.contents;
          this.pagInfo = res.pageInfo
          this.length = this.pagInfo.totalElements;
          this.albums.map(p => p.fileUrl = this.getFileUrl(p.file))
          this.loadingShow = false
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
        albumModel: newAlbumModel,
        baseUrl: this.baseUrl
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

