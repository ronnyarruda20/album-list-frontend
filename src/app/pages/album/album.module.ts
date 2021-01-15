import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbTooltipModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { AlbumListComponent } from './album-list/album-list.component';
import { GhostLoadingComponent } from './album-list/ghost-loading/ghost-loading.component';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumService } from './album.service';
import { SafePipeModule } from 'safe-pipe';

@NgModule({
  declarations: [AlbumListComponent, GhostLoadingComponent],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    ThemeModule,
    NbCardModule,
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbEvaIconsModule,
    SafePipeModule,
    ScrollingModule,
    MatPaginatorModule,
  ],
  providers: [
    AlbumService,
  ],
})
export class AlbumModule { }
