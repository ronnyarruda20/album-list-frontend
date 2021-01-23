import { AutorService } from './autor.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutorListComponent } from './autor-list/autor-list.component';
import { AutorRoutingModule } from './autor-routing.module';
import { NbListModule, NbCardModule, NbAccordionModule, NbButtonModule, NbRouteTabsetModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AutorListComponent],
  imports: [
    CommonModule,
    AutorRoutingModule,
    ThemeModule,
    NbCardModule,
    NbListModule,
    // FormsModule,
    // ReactiveFormsModule,
    // ThemeModule,
    // NbTabsetModule,
    // NbRouteTabsetModule,
    // NbStepperModule,
    // NbCardModule,
    // NbButtonModule,
    // NbListModule,
    // NbAccordionModule,
    // NbUserModule,
  ],
  providers: [
    AutorService
  ]
})
export class AutorsModule { }
