import { Component } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [
    FormsModule,
    SharedModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  name: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

   onSubmit() {
  //   this.authService.signUp(this.name, this.password).subscribe({
  //     next: () => {
  //       console.log('Inscription réussie !');
  //     },
  //     error: (error) => {
  //       console.error('Erreur lors de inscription : ', error);
  //     }
  //   });
   }

}
