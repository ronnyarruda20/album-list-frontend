import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.scss']
})
export class AlbumItemComponent implements OnInit {

  constructor(protected ref: NbDialogRef<AlbumItemComponent>) {}


  ngOnInit(): void {
  }

  dismiss() {
    this.ref.close();
  }
}
