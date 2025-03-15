import { Component } from '@angular/core';
import { ProductListComponent } from '../products/components/product-list/product-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  imports: [
    CommonModule,
    ProductListComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
