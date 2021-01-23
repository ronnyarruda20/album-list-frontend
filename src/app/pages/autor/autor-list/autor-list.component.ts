
import { Component, OnInit } from '@angular/core';
import { AutorModel } from '../autor.model';
import { AutorService } from '../autor.service';

@Component({
  selector: 'ngx-autor-list',
  templateUrl: './autor-list.component.html',
  styleUrls: ['./autor-list.component.scss']
})
export class AutorListComponent implements OnInit {

  autors = new Array<AutorModel>();

  constructor(private service: AutorService) { }

  ngOnInit(): void {
    this.loadAutor();
  }

  private loadAutor() {
    this.service.list()
      .subscribe(res => {
       this.autors = res;
      });
  }


}
