
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AutorModel } from './autor.model';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  endPoint: string = environment.api + "autor"

  constructor(
    public httpClient: HttpClient,
    public activatedRoute?: ActivatedRoute,
  ) { }

  ngOnInit() { }

  list(): Observable<AutorModel[]> {
    return this.httpClient.get<any>(this.endPoint + '/list').pipe();
  }

  save(autor: AutorModel): Observable<any> {
    return this.httpClient.post<any>(this.endPoint + '/save', autor).pipe();
  }

  delete(id: string): Observable<any> {
    let formData = new FormData();
    formData.append('id', id);
    return this.httpClient.post<any>(this.endPoint + '/delete', formData).pipe();
  }

}
