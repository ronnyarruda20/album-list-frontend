import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  pageSize = 10
  news = new Array<NewsPost>();
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  firstCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };

  constructor(
    private service: AlbumService,
    private newsService: NewsService,
    public activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.data.subscribe(data => {
      this.baseUrl = environment.api + data.endPoint
    });

  }

  ngOnInit(): void {
    this.loadNext(this.firstCard);
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

  loadNext(cardData) {
    console.log(cardData)
    if (cardData.loading) { return; }

    cardData.loading = true;
    cardData.placeholders = new Array(this.pageSize);
    this.newsService.load(0,50)
      .subscribe(nextNews => {
        this.news.push(...nextNews);
        cardData.placeholders = [];
        cardData.news.push(...nextNews);
        cardData.loading = false;
        cardData.pageToLoadNext++;
      });
  }


}
