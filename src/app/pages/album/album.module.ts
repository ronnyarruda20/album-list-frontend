import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbLayoutModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { AlbumListComponent } from './album-list/album-list.component';
import { NewsPostPlaceholderComponent } from './album-list/news-post-placeholder/news-post-placeholder.component';
import { AlbumRoutingModule } from './album-routing.module';

@NgModule({
  declarations: [AlbumListComponent, NewsPostPlaceholderComponent],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    ThemeModule,
    NbCardModule,
    NbLayoutModule,
    NbButtonModule,
  ],
})
export class AlbumModule { }
