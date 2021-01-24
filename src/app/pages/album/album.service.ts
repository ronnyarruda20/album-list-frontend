import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationModel } from 'app/shared/model/pagination.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AutorModel } from '../autor/autor.model';
import { AutorService } from '../autor/autor.service';
import { AlbumModel } from './album.model';


@Injectable({
  providedIn: 'root'
})
export class AlbumService implements OnInit {

  baseUrl: string = environment.api + 'album'

  constructor(
    public httpClient: HttpClient,
    private autorService: AutorService,
    public activatedRoute?: ActivatedRoute,
  ) { }

  ngOnInit() { }

  list(pageNumber: any, pageSize: any, searchTerm: string = null): Observable<PaginationModel<AlbumModel>> {
    let paramn = searchTerm ? 'searchTerm' : null;
    return this.httpClient.get<any>(this.baseUrl + '/list', {
      params: new HttpParams()
        .set(paramn, searchTerm)
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

  listAutor(): Observable<AutorModel[]> {
    return this.autorService.list().pipe();
  }

}
