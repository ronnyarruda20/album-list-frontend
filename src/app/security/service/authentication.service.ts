import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { JwtAuthentication } from '../model/jwt.authentication.model';
import { UserDetails } from '../model/user.model';

const httpOptions = {
    headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'isRefreshToken': 'true'
        }),
    withCredentials: true
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserDetails>;
    public currentUser: Observable<UserDetails>;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<UserDetails>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserDetails {
        return this.currentUserSubject.value;
    }

    login(authentication: JwtAuthentication) {
        return this.http.post<UserDetails>(`${environment.api}auth/login`, authentication)
            .pipe(map(userDetails => {
                // login successful if there's a jwt token in the response
                if (userDetails && userDetails.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(userDetails));
                    this.currentUserSubject.next(userDetails);
                    this.startRefreshTokenTimer();
                }

                return userDetails;
            }));
    }

    home() {
        this.router.navigate(['/']);
    }

    logout() {
        // remove user from local storage to log user out
        this.stopRefreshTokenTimer();
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
    }

    refreshToken() {
        return this.http.get<any>(`${environment.api}auth/refreshtoken`)
            .pipe(map((user) => {
                this.currentUserValue.token = user.jwttoken;
                localStorage.setItem('currentUser', JSON.stringify(this.currentUserValue));
                this.currentUserSubject.next(this.currentUserValue);
                this.startRefreshTokenTimer();
                return user;
            }));

    }

    // helper methods
    private refreshTokenTimeout;

    private startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(atob(this.currentUserValue.token.split('.')[1]));
        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000);
        console.log(expires)
        // const timeout = expires.getTime() - Date.now() - (60 * 1000);
        const timeout = expires.getTime() - Date.now() - (500);
        console.log(timeout)
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

}