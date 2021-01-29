import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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

  sort: string = "ASC"
  pageInfo = new PageInfo
  loadingShow: boolean = true
  albums = new Array<AlbumModel>();
  searchTerm: string = null;

  @ViewChild('paginator', { static: false }) paginator: MatPaginator;

  constructor(
    private service: AlbumService,
    private sanitizer: DomSanitizer,
    public activatedRoute: ActivatedRoute,
    private searchService: NbSearchService,
    private dialogService: NbDialogService,
  ) {

  }

  ngOnInit(): void {
    this.loadALbum(this.pageInfo.pageNumber, this.pageInfo.pageSize);
    this.loadSearch();
  }

  setPageEvent(pageEvent: PageEvent) {
    this.loadALbum(pageEvent.pageIndex, pageEvent.pageSize, this.searchTerm, this.sort)
  }
  
  loadSearch() {
    this.searchService.onSearchSubmit()
    .subscribe((data: any) => {
      this.pageInfo = new PageInfo
      this.searchTerm = data.term;
      this.loadALbum(0, 5, this.searchTerm, this.sort);
    })
  }
  
  clearSearch() {
    if (this.searchTerm) {
      this.searchTerm = null;
      this.loadALbum(0, 5, this.searchTerm, this.sort);
    }
  }
  
  changeSort(){
    this.loadALbum(this.pageInfo.pageNumber, this.paginator.pageSize, this.searchTerm, this.sort)
  }

  private loadALbum(pageNumber: number, pageSize: number, searchTerm?: string, sort?: string) {
    this.loadingShow = true
    this.service.list(pageNumber, pageSize, searchTerm, sort)
      .subscribe(res => {
        this.albums = res.contents;
        this.pageInfo = res.pageInfo
        this.paginator.pageIndex = res.pageInfo.pageNumber;
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
        this.loadALbum(this.pageInfo.pageNumber, this.pageInfo.pageSize, this.searchTerm, this.sort);
      }
    });
  }

  openAddAlbumItemDialog() {
    this.openAlbumItemDialog(null)
  }

}

