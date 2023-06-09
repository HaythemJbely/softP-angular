import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { SignupRequest } from '../models/SignupRequest';
import { User } from '../models/User';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Role } from '../models/Role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupRequest: SignupRequest = new SignupRequest();
  signupForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { 
      this.signupForm = this.formBuilder.group({
        name: [null],
        cin: [null],
        age: [null],
        address:[null],
        email: [null],
        username: [null],
        password: [null]
      })
    }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getSignupRequestForm():SignupRequest {
    return {
      ...new SignupRequest(),
      username: this.signupForm.get(['username'])?.value,
      email: this.signupForm.get(['email'])?.value,
      roles: [Role.User],
      password: this.signupForm.get(['password'])?.value,
    }
  }

  getUserForm(): User{
    return {
      ...new User(),
      name: this.signupForm.get(['name'])?.value,
      cin: this.signupForm.get(['cin'])?.value,
      age: this.signupForm.get(['age'])?.value,
      address:[this.signupForm.get(['address'])?.value],
      username: this.signupForm.get(['username'])?.value,
      password: this.signupForm.get(['password'])?.value
    }
  }

  signup() {
    this.signupRequest = this.getSignupRequestForm();
    this.signupRequest.user = new User();
    this.signupRequest.user = this.getUserForm();

    this.authenticationService.signup(this.signupRequest).subscribe(res => {
      console.log(res);
    },
      error => {
        console.log(error);

      }
    );
    this.router.navigate(['/login']);
  }

}
