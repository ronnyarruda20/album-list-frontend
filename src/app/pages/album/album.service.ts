import { AlbumModel } from './album.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationModel } from 'app/shared/model/pagination.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService implements OnInit {

  private baseUrl: string;

  constructor(
    public httpClient: HttpClient,
    public activatedRoute?: ActivatedRoute,
  ) {
  }
  ngOnInit() {
    this.baseUrl = environment.api
  }


  getAllPaginate(pageNumber: any, pageSize: any, endPoint: string, saerchTerm?: any): Observable<PaginationModel<AlbumModel>> {
    return this.httpClient.get<any>(endPoint + '/list', {
      params: new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).pipe();
  }


}
