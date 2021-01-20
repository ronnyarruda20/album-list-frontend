import { HttpEvent } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationModel } from 'app/shared/model/pagination.model';
import { Observable } from 'rxjs';
import { AlbumModel } from './album.model';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'multipart/form-data; boundary=---WebKitFormBoundaryE19zNvXGzXaLvS5C'
    })
};


@Injectable({
  providedIn: 'root'
})
export class AlbumService implements OnInit {

  constructor(
    public httpClient: HttpClient,
    public activatedRoute?: ActivatedRoute,
  ) { }

  ngOnInit() { }

  getAllPaginate(pageNumber: any, pageSize: any, endPoint: string, saerchTerm?: any): Observable<PaginationModel<AlbumModel>> {
    return this.httpClient.get<any>(endPoint + '/list', {
      params: new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).pipe();
  }

  getImage(imagem: string, endPoint: string): Observable<any> {
    return this.httpClient.get(endPoint + '/files/' + imagem, { responseType: 'arraybuffer' }).pipe();
  }

  save(albumModel: AlbumModel, endPoint: string): Observable<AlbumModel> {
    return this.httpClient.post<AlbumModel>(endPoint + '/save', albumModel).pipe();
  }

  file(file: File, endPoint: string): Observable<any> {
    let formData = new FormData();
    formData.append('file', file, 'file');
    console.log()
    return this.httpClient.post<any>(endPoint + '/files/upload', formData).pipe();
  }

}
