import { AlbumModel } from './../album.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Utils } from 'app/shared/utils/utls';
import { DomSanitizer } from '@angular/platform-browser';
import { AlbumService } from '../album.service';
import { TemplateRef } from '@angular/core';
import { RemoveDialogComponent } from 'app/shared/dialog/remove-dialog/remove-dialog.component';

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
  refresh: boolean = false

  constructor(
    private service: AlbumService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    protected ref: NbDialogRef<AlbumItemComponent>,
  ) { }


  ngOnInit(): void {
    this.createObject();

    if (this.albumModel) {
      this.albumModel.fileUrl = this.getFileUrl(this.albumModel.file);
      this.form.patchValue(this.albumModel)
    }
  }

  createObject() {
    this.form = this.formBuilder.group({
      id: [],
      nome: [null, Validators.required],
      file: [null],
      autor: this.formBuilder.group({
        id: [],
        nome: [null, Validators.required]
      })
    })
  }

  handleFileInput(event: any) {
    this.file = event.target.files.item(0);
    Utils.getBase64(this.file).then(res => {
      this.form.controls.file.setValue(res);
    })
    this.albumModel.fileUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.file));
  }

  getFileUrl(file: string) {
    if (Utils.hasValue(file)) {
      return this.sanitizer.bypassSecurityTrustUrl(Utils.converterBlobToUrl(file, 'png'));
    } else {
      return './assets/images/no-image.png';
    }
  }

  saveImage() {
    this.service.saveImage(this.file, String(this.albumModel.id), this.baseUrl).subscribe(res => {
      if (res) {
        this.refresh = true;
      }
    })
  }

  saveAlbum() {
    this.service.save(this.form.value, this.baseUrl).subscribe(res => {
      if (res) {
        this.refresh = true;
        this.dismiss();
      }
    })
  }

  deleteAlbum() {
    this.service.delete(String(this.albumModel.id), this.baseUrl)
      .subscribe(res => {
        if (res) {
          this.refresh = true;
          this.dismiss();
        }
      });
  }

  dismiss() {
    this.ref.close(this.refresh);
  }

  deleteVerification() {
    this.dialogService.open(RemoveDialogComponent)
      .onClose.subscribe(res => {
        if (res) {
          this.deleteAlbum()
        }
      })
  }
}
