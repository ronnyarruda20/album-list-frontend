import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbSpinnerModule, NbTooltipModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { SafePipeModule } from 'safe-pipe';
import { AlbumItemComponent } from './album-item/album-item.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { GhostLoadingComponent } from './album-list/ghost-loading/ghost-loading.component';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumService } from './album.service';

@NgModule({
  declarations: [
    AlbumListComponent, 
    GhostLoadingComponent, 
    AlbumItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlbumRoutingModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbSpinnerModule,
    NbLayoutModule,
    NbButtonModule,
    FormsModule,
    NbIconModule,
    NbTooltipModule,
    NbEvaIconsModule,
    SafePipeModule,
    ScrollingModule,
    MatPaginatorModule,
    NbDialogModule.forChild(),
  ],
  providers: [
    AlbumService,
  ],
})
export class AlbumModule { }
