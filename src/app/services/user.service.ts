import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { environment } from 'src/environment/environment';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    /**
     * Retrieves all users from the server.
     * @returns {Observable<User[]>} An observable that emits an array of User objects.
     */
    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/user/getAllUsers`);
    }
}