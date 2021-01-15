import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { NewsPost, NewsService } from 'app/pages/layout/news.service';
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
  pageEvent: PageEvent;
  placeholders: any;

  constructor(
    private service: AlbumService,
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
        }
        this.placeholders = [];
      });
  }

  setPageEvent(pageEvent: PageEvent) {
    this.loadALbum(pageEvent.pageIndex, pageEvent.pageSize)
    console.log(pageEvent)
  }

}

