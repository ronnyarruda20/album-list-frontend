import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { AlbumService } from '../album.service';

@Component({
  selector: 'ngx-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {

  private baseUrl: string;
  pageSize = 2

  constructor(
    private service: AlbumService,
    public activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.data.subscribe(data => {
      this.baseUrl = environment.api + data.endPoint
    });

  }

  ngOnInit(): void {
    // this.service.getAllPaginate(0, 1, this.baseUrl, null)
    //   .subscribe(res => {
    //     console.log(res.contents)
    //   });
  }

  // loadNext(cardData) {
  //   if (cardData.loading) { return; }

  //   cardData.loading = true;
  //   cardData.placeholders = new Array(this.pageSize);
  //   this.service.getAllPaginate(cardData.pageToLoadNext, this.pageSize, this.baseUrl, null)
  //     .subscribe(res => {
  //       if(res.contents.length > 0){
  //         cardData.news.push(res.contents);
  //         cardData.pageToLoadNext++;
  //         cardData.loading = false;
  //         cardData.placeholders = [];
  //       } 
  //     });
  // }

}
