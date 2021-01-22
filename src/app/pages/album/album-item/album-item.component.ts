import { AlbumModel } from './../album.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Utils } from 'app/shared/utils/utls';
import { DomSanitizer } from '@angular/platform-browser';
import { AlbumService } from '../album.service';

@Component({
  selector: 'ngx-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.scss']
})
export class AlbumItemComponent implements OnInit {

  @ViewChild('inputFile')
  inputFile: ElementRef;

  file: File;
  form: FormGroup;
  baseUrl: string;
  albumModel: AlbumModel

  constructor(
    private service: AlbumService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    protected ref: NbDialogRef<AlbumItemComponent>,
  ) { }


  ngOnInit(): void {
    if (this.albumModel) {
      this.albumModel.fileUrl = this.getFileUrl(this.albumModel.file);
    }
    this.createObject();
    this.form.patchValue(this.albumModel)
  }

  createObject() {
    this.form = this.formBuilder.group({
      id: [],
      nome: [null, Validators.required],
      autor: this.formBuilder.group({
        id: [],
        nome: [null, Validators.required]
      })
    })
  }

  handleFileInput(event: any) {
    this.file = event.target.files.item(0);
    this.albumModel.fileUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.file));
    this.saveImage();
  }

  getFileUrl(file: string) {
    if (Utils.hasValue(file)) {
      return this.sanitizer.bypassSecurityTrustUrl(Utils.converterBlobToUrl(file, 'png'));
    } else {
      return './assets/images/no-image.png';
    }
  }

  saveImage() {
    if(this.baseUrl){
      this.service.saveImage(this.file, String(this.albumModel.id), this.baseUrl).subscribe( res => {
        console.log('Retorno da imagem')
        console.log(res)
      })
    }
  }

  saveAlbum() {
    // this.service.list(pageNumber, pageSize, this.baseUrl, null)
    //   .subscribe(res => {
    //     if (res.contents.length > 0) {
    //       this.albums = res.contents;
    //       this.length = res.pageInfo.totalElements;
    //       this.albums.map(p => p.fileUrl = this.getFileUrl(p.file))
    //     }
    //   });
  }

  dismiss() {
    this.ref.close();
  }
}
