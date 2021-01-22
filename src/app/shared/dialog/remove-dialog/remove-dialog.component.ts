import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.scss']
})
export class RemoveDialogComponent implements OnInit {

  constructor(protected ref: NbDialogRef<RemoveDialogComponent>,) { }

  ngOnInit(): void {
  }

  confirm() {
    this.ref.close(true);
  }

  dismiss() {
    this.ref.close(false);
  }

}
