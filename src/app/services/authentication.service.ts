import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/User';
import { SERVER_API_URL } from '../app.constants';
import { SignupRequest } from '../models/SignupRequest';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    private resourceUrl = SERVER_API_URL + 'api/auth';

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(user: User) {
        return this.http.post<any>(`${this.resourceUrl}/signin`, user)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('isLoggedIn', 'true');
                this.userSubject.next(user);
                window.location.reload();
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.setItem('isLoggedIn', 'false'); // Update the value to 'false'
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/']);
    }

    signup(signupRequest :SignupRequest){
        return this.http.post<string>(`${this.resourceUrl}/signup`, signupRequest);
    }
}