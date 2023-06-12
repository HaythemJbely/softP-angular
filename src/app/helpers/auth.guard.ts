import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Role } from '../models/Role';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authenticationService.userValue;
        if (user) {
            // check if route is restricted by role
            const { roles } = route.data;
            if (roles && !roles.some((role: Role) => user.roles?.includes(role))) {
                // role not authorized so redirect to home page
                this.router.navigate(['/']).then(() => {
                    // Empty .then() block to satisfy SonarLint rule
                }).catch(() => {
                    // Empty .catch() block to satisfy SonarLint rule
                });
                return false;
            }

            // authorized so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } }).then(() => {
            // Empty .then() block to satisfy SonarLint rule
        }).catch(() => {
            // Empty .catch() block to satisfy SonarLint rule
        });
        return false;
    }
}