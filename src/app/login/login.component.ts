import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports:[
      FormsModule,
      CommonModule
    ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, 
              private storageService: StorageService,
              private router : Router
            ) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
        
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });

  }

  reloadPage(): void {
    
    this.router.navigateByUrl('user').then(() => {
      setTimeout( () => {
          window.location.reload()
        } , 1000 )
    })
    // window.location.reload();
    // setTimeout( () => {
    //   this.router.navigateByUrl('user');
    //   console.log('REDIRECTION')
    // } , 1000 )
     
  }

  discover(){
    let c = encodeURI('Je souhaite avoir un accès à la plateforme Ramacos.com !');
    let url = `https://wa.me/237679197112?text=${c}`
    window.location.href = url;
  }
  
  discoveren(){
    let c = encodeURI('I would like to request access to the Ramacos.com platform. !');
    let url = `https://wa.me/237679197112?text=${c}`
    window.location.href = url;
  }

}
