import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAuthModule } from '@nebular/auth';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbIconModule, NbInputModule, NbSpinnerModule } from '@nebular/theme';
import { NgxLoginComponent } from './login/ngx-login.component';
import { NgxLogoutComponent } from './logout/ngx-logout.component';
import { NgxAuthRoutingModule } from './ngx-auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbAuthModule,
    NbEvaIconsModule,
    NbIconModule,
    NbSpinnerModule,
    HttpClientModule,
  ],
  declarations: [
    NgxLoginComponent, 
    NgxLogoutComponent,
  ],
})
export class NgxAuthModule {
}