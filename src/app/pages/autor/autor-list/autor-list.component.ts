import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { AutorModel } from '../autor.model';
import { AutorService } from '../autor.service';

@Component({
  selector: 'ngx-autor-list',
  templateUrl: './autor-list.component.html',
  styleUrls: ['./autor-list.component.scss']
})
export class AutorListComponent implements OnInit {

  autor = new AutorModel();
  autors = new Array<AutorModel>();
  autorNome = new FormControl(null, Validators.required);
  @ViewChild('item', { static: true }) accordion;

  constructor(private service: AutorService, private nbToastrService: NbToastrService) { }

  ngOnInit(): void {
    this.loadAutor();
  }

  private loadAutor() {
    this.service.list()
      .subscribe(res => {
        this.autors = res;
      });
  }

  public save() {
    this.autor.nome = this.autorNome.value;
    this.service.save(this.autor).subscribe(res => {
      if (res) {
        this.loadAutor();
        this.autorNome.reset();
        this.autor = new AutorModel();
        this.nbToastrService.success(null, res.message)
      }
    })
  }

  public carregarAutor(autorModel: AutorModel) {
    this.autor = autorModel;
    this.autorNome.setValue(this.autor.nome);
    if (this.accordion.collapsedValue) {
      this.accordion.toggle();
    }
  }

  public excluir(id) {
    this.service.delete(String(id)).subscribe(res => {
      if (res) {
        this.loadAutor();
        this.nbToastrService.success(null, res.message)
        if (!this.accordion.collapsedValue) {
          this.accordion.toggle();
        }
      }
    })
  }

  public limpar() {
    this.autorNome.reset();
    this.autor = new AutorModel();
  }

}
