
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private nbToastrService: NbToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403, 0].indexOf(err.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                this.authenticationService.logout();
                // location.reload();
                this.nbToastrService.danger(null, "Serviço não encontrado");
                return throwError("Serviço não encontrado", err);
            }

            if (err.error.message) {
                this.nbToastrService.danger(null, err.error.message);
                return throwError(err.message);
            } else if (err.error.errors) {
                err.error.errors.forEach(element => {
                    this.nbToastrService.danger(null, element);
                });
                return throwError(err.error.errors);
            } else if (err.error.mensagem) {
                this.nbToastrService.danger(null, err.error.mensagem);
                return throwError(err.error.mensagem);
            }
            this.nbToastrService.danger(null, err.message);
            return throwError(err.message);
        }))
    }
}