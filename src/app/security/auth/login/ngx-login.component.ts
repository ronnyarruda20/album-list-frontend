import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { JwtAuthentication } from '../../model/jwt.authentication.model';
import { AuthenticationService } from '../../service/authentication.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./ngx-login.component.scss'],
})
export class NgxLoginComponent implements OnInit {
 
  isProduction = environment.production;
  formLogin: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  private authentication: JwtAuthentication;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  // convenience getter for easy access to form fields
  public get f() { return this.formLogin.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formLogin.invalid) {
      return;
    }

    this.loading = true;
    this.authentication = new JwtAuthentication(this.f.username.value, this.f.password.value);
    this.authenticationService.login(this.authentication)
      .pipe(first())
      .subscribe(
        data => {
            this.router.navigate(['/']);
        },
        error => {
          this.error = error;
          this.loading = false;
          this.submitted = false;
        });
  }

}