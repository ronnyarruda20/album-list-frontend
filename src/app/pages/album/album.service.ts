import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationModel } from 'app/shared/model/pagination.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AlbumModel } from './album.model';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/ms-excel'
    })
};

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

  getImage(imagem: string, endPoint: string): Observable<any> {
    return this.httpClient.get(endPoint + '/files/' + imagem, { responseType: 'arraybuffer' }).pipe();
      // .subscribe((res: any) => {
      //   let blob = new Blob([res], { type: "application/ms-excel" });
      //   return window.URL.createObjectURL(blob);
      // })
  }





}
