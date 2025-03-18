import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../../core/model/customer';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';

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

  constructor(private route:Router){}

  ngOnInit(): void {
    
  }

  onSubmitForm(){
    this.route.navigateByUrl('customer/customer-start')
  }

  openSignUp(){
    this.route.navigateByUrl('consumer-start')
  }

}
