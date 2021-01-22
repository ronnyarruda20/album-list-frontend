import { NgModule } from "@angular/core";
import { NbCardModule, NbButtonModule, NbDialogModule } from "@nebular/theme";
import { RemoveDialogComponent } from './dialog/remove-dialog/remove-dialog.component';

@NgModule({
  imports: [
    NbCardModule,
    NbButtonModule,
    NbDialogModule.forChild(),
  ],
  declarations: [RemoveDialogComponent],
  exports: [RemoveDialogComponent],
})
export class SharedModule { }
