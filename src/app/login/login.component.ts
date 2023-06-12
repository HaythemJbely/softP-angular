import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { LoginRequest } from '../models/LoginRequest';
import { Role } from '../models/Role';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    loginRequest: LoginRequest = new  LoginRequest();

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.userValue) { 
            this.router.navigate(['/elasticProduct']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get f() { return this.loginForm.controls; }

    getloginRequestForm(): LoginRequest {
      return {
        ...new LoginRequest(),
        username: this.loginForm.get(['username'])?.value,
        password: this.loginForm.get(['password'])?.value,
      }
    }

    onSubmit() {
        this.submitted = true;
        this.loginRequest = this.getloginRequestForm();
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.error = '';
        this.loading = true;
        this.authenticationService.login(this.loginRequest)
            .pipe(first())
            .subscribe({
                next: () => {
                    // Check the role of the user
                    const userRole = this.authenticationService.userValue!.roles;
                    
                    // Navigate based on the user role
                    if (userRole?.includes(Role.Admin)) {
                        this.router.navigate(['/kibana']);
                    } else if (userRole?.includes(Role.User)) {
                        this.router.navigate(['/elasticProduct']);
                    } else {
                        // Handle the case if the user role is not recognized
                        this.error = 'Invalid user role';
                    }
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}