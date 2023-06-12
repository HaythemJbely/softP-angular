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


    /**
     * Sends a login request to the server with the provided user credentials.
     * If the login is successful, the user details and JWT token are stored in the local storage.
     * to keep the user logged in between page refreshes.
     * @param {User} user - The user object containing the login credentials. 
     * @returns {Observable<any>} An observable that emits the response from the server.
     */
    login(user: User) {
        return this.http.post<any>(`${this.resourceUrl}/signin`, user)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }



    /**
     * Logs out the user by removing their details from the local storage and navigating to the home page.
     */
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/']).then(() => {
            // Empty .then() block to satisfy SonarLint rule
        }).catch(() => {
            // Empty .catch() block to satisfy SonarLint rule
        });
    }


    /**
     * Sends a signup request to the server with the provided signup details.
     * @param {SignupRequest} signupRequest - The signup request object containing the user's signup details. 
     * @returns {Observable<string>} An observable that emits the response from the server.
     */
    signup(signupRequest: SignupRequest) {
        return this.http.post<string>(`${this.resourceUrl}/signup`, signupRequest);
    }
}