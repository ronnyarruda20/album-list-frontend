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
      'Content-Type': 'application/json',
    })
};


@Injectable({
  providedIn: 'root'
})
export class AlbumService implements OnInit {

  baseUrl: string = environment.api + 'album'

  constructor(
    public httpClient: HttpClient,
    public activatedRoute?: ActivatedRoute,
  ) { }

  ngOnInit() { }

  list(pageNumber: any, pageSize: any, saerchTerm?: any): Observable<PaginationModel<AlbumModel>> {
    return this.httpClient.get<any>(this.baseUrl + '/list', {
      params: new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).pipe();
  }

  save(album: AlbumModel): Observable<AlbumModel> {
    return this.httpClient.post<AlbumModel>(this.baseUrl + '/save', album).pipe();
  }

  delete(id: string): Observable<AlbumModel> {
    let formData = new FormData();
    formData.append('id', id);
    return this.httpClient.post<any>(this.baseUrl + '/delete', formData).pipe();
  }

  saveImage(file: File, id: string): Observable<any> {
    let formData = new FormData();
    formData.append('extraParam', id);
    formData.append('file', file, file.name);
    return this.httpClient.post<any>(this.baseUrl, formData).pipe();
  }

}
