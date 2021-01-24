import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { AutorModel } from 'app/pages/autor/autor.model';
import { RemoveDialogComponent } from 'app/shared/dialog/remove-dialog/remove-dialog.component';
import { Utils } from 'app/shared/utils/utls';
import { AlbumModel } from '../album.model';
import { AlbumService } from '../album.service';

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
  loadingShow: boolean = false
  autors = new Array<AutorModel>();
  autorNome = new FormControl();
  new: boolean = true;

  constructor(
    private service: AlbumService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    protected ref: NbDialogRef<AlbumItemComponent>,
  ) { }


  ngOnInit(): void {
    this.loadAutor();
    this.createObject();
    this.loadingObject();
  }

  loadingObject() {
    if (this.albumModel) {
      this.new = false;
      this.albumModel.fileUrl = this.getFileUrl(this.albumModel.file);
      this.form.patchValue(this.albumModel)
      this.autorNome.setValue(this.albumModel.autor.id)
      this.autorNome.disable();
    } else {
      this.albumModel = new AlbumModel();
    }
    this.autorNome.valueChanges.subscribe( res => {
      this.form.get('autor').patchValue(this.autors.find(p => p.id == res))
    })
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


  saveAlbum() {
    this.loadingShow = true;
    this.service.save(this.form.value).subscribe(res => {
      if (res) {
        this.refresh = true;
        this.dismiss();
      }
      this.loadingShow = false;
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

  private loadAutor() {
    this.service.listAutor()
      .subscribe(res => {
        this.autors = res;
      });
  }
}
