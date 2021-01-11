import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { JwtAuthentication } from '../model/jwt.authentication.model';
import { Response } from '../model/reponse';
import { Token } from '../model/token';
import { UserDetails } from '../model/user.model';
import { Authorization } from './../model/authorization.model';

const httpOptions = {
    headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserDetails>;
    public currentUser: Observable<UserDetails>;

    constructor(private http: HttpClient, private router: Router, private permissionsService: NgxPermissionsService) {
        this.currentUserSubject = new BehaviorSubject<UserDetails>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserDetails {
        return this.currentUserSubject.value;
    }

    login(authentication: JwtAuthentication) {
        return this.http.post<Response<Token>>(`${environment.api}auth`, authentication, httpOptions)
            .pipe(map(response => {
                // login successful if there's a jwt token in the response
                if (response && response.data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    response.userDetails.token = response.data.token;
                    localStorage.setItem('currentUser', JSON.stringify(response.userDetails));
                    this.currentUserSubject.next(response.userDetails);
                    this.carregarPermissions(response.userDetails.authorities);
                }

                return response.userDetails;
            }));
    }

    home() {
        this.router.navigate(['/']);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
        this.permissionsService.flushPermissions();
    }

    carregarPermissions(autorieties: Authorization[]) {
        let permissions = autorieties.map(role => role.authority); 
        this.permissionsService.loadPermissions(permissions);
    }
}