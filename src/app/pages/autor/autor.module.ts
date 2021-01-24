import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbLayoutModule, NbListModule, NbSpinnerModule, NbInputModule, NbTooltipModule, NbIconModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { AutorListComponent } from './autor-list/autor-list.component';
import { AutorRoutingModule } from './autor-routing.module';
import { AutorService } from './autor.service';



@NgModule({
  declarations: [AutorListComponent],
  imports: [
    CommonModule,
    AutorRoutingModule,
    ThemeModule,
    FormsModule,
    NbCardModule,
    NbListModule,
    NbInputModule,
    NbLayoutModule,
    NbIconModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbSpinnerModule,
    NbTooltipModule,
    ScrollingModule,
    NbAccordionModule,
    ReactiveFormsModule,
  ],
  providers: [
    AutorService
  ]
})
export class AutorsModule { }
