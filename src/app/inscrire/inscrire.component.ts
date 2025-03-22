import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConsumerService } from '../consumer/consumer.service';
import { Prospect } from '../core/model/prospect';

@Component({
  selector: 'app-inscrire',
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './inscrire.component.html',
  styleUrl: './inscrire.component.scss'
})


export class InscrireComponent implements OnInit {
  form: any = {
      username: null,
      localisation: null,
      tel1: null,
      tel2: null
    };

    
    isSuccessful = false;
    isSignUpFailed = false;
    errorMessage = '';
    prospect!: Prospect;
    newProspect!: FormGroup
  
    constructor(private customerService: ConsumerService, private formBuilder: FormBuilder,) { }

    ngOnInit(): void {
      this.newProspect = this.formBuilder.group ({
        username: [null],
        localisation: [null],
        tel1: [null],
        tel2: [null]
      });
    }
  
    onSubmit(): void {
      this.customerService.sendPospect(this.newProspect.value).subscribe({
        next: data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      }

      )
  
      // this.authService.register(username, email, password).subscribe({
      //   next: data => {
      //     console.log(data);
      //     this.isSuccessful = true;
      //     this.isSignUpFailed = false;
      //   },
      //   error: err => {
      //     this.errorMessage = err.error.message;
      //     this.isSignUpFailed = true;
      //   }
      // });
    }

}
