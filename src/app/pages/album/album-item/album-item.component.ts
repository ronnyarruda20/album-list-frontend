import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { RemoveDialogComponent } from 'app/shared/dialog/remove-dialog/remove-dialog.component';
import { Utils } from 'app/shared/utils/utls';
import { environment } from 'environments/environment';
import { AlbumService } from '../album.service';
import { AlbumModel } from './../album.model';

@Component({
  selector: 'ngx-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.scss']
})
export class AlbumItemComponent implements OnInit {

  file: File;
  form: FormGroup;
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
    this.service.saveImage(this.file, String(this.albumModel.id)).subscribe(res => {
      if (res) {
        this.refresh = true;
      }
    })
  }

  saveAlbum() {
    this.service.save(this.form.value).subscribe(res => {
      if (res) {
        this.refresh = true;
        this.dismiss();
      }
    })
  }

  deleteAlbum() {
    this.service.delete(String(this.albumModel.id))
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
