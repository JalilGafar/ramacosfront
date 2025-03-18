import { Component } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-consumer-start',
  imports: [
    ProductListComponent
  ],
  templateUrl: './consumer-start.component.html',
  styleUrl: './consumer-start.component.scss'
})
export class ConsumerStartComponent {

}
