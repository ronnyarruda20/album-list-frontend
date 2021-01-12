import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbActionsModule, NbButtonModule, NbCardModule, NbLayoutModule, NbUserModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumRoutingModule } from './album-routing.module';



@NgModule({
  declarations: [AlbumListComponent],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    ThemeModule,
    NbCardModule,
    NbLayoutModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
  ]
})
export class AlbumModule { }
