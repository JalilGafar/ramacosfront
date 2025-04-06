import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Prospect } from '../core/model/prospect';
import { ConsumerService } from '../consumer/consumer.service';
import { passwordMatchValidator } from '../core/password-match.validator';

@Component({
  selector: 'app-register',
  imports:[
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  newClient!: FormGroup;

  constructor(
    private authService: AuthService, 
    private customerService: ConsumerService, 
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.newClient = this.formBuilder.group ({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)] ],
      confirmPassword: ['', Validators.required],
      localisation: [null, Validators.required],
      tel1: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      tel2: ['', Validators.pattern(/^[0-9]{9}$/)]
    }, {validator: passwordMatchValidator});
  }


  // passwordMatchValidator:ValidatorFn = (control: AbstractControl): ValidationErrors |null => {
  //   const password = control.get('password');
  //   const confirmPassword = control.get('confirmPassword');
  //   if (!password || !confirmPassword) {
  //     return null;      
  //   }
  //   return password.value === confirmPassword.value ? null : { passwordMismatch: true};
  // }

  onSubmit(): void {
    // const { username, email, password } = this.form;
    console.log('on entre dans submit')
    if (this.newClient.valid) {
      // delete FormData.confirmPassword;
      console.log('les donnée sont valide')
      this.authService.register(this.newClient.value).subscribe({
        next: data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
    }

  }
}
