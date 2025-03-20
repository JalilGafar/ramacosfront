import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../../core/model/customer';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-login-consumer',
  imports: [
    FormsModule,
    SharedModule
  ],
  templateUrl: './login-consumer.component.html',
  styleUrl: './login-consumer.component.scss'
})
export class LoginConsumerComponent implements OnInit {

  Custumer!: Customer
  name: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private route:Router, private authService: AuthService){}

  ngOnInit(): void {
    
  }

  onSubmitForm(){
    // this.route.navigateByUrl('customer/customer-start')
    // this.errorMessage = '';
    // this.authService.signIn(this.name, this.password).subscribe({
    //   next : () => {
    //     this.route.navigate(['/']);
    //   },
    //   error: (error) => {
    //     this.errorMessage = 'Email ou mot de passe incorrect !';
    //     console.error('Erreur lors de la connexion : ', error);
    //   }
    // })

  }

  openSignUp(){
    this.route.navigateByUrl('consumer-start')
  }

}
