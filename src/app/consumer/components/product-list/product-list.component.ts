import { Component, OnInit } from '@angular/core';
import { ConsumerService } from '../../consumer.service';
import { Observable } from 'rxjs';
import { Produit } from '../../../core/model/produit';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    ProductComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

    products!: Produit[];
    produits$!: Observable <Produit[]>;
    types$!: Observable <{type: string} []>;
    types!: {type: string} [];
    total: number = 0;


    constructor(private consService : ConsumerService, private route:Router){}
  
    ngOnInit(): void {
      //this.products = this.productService.getProducts()
      this.consService.getProductsFromServer().subscribe();
      this.produits$ = this.consService.produits$;

      this.types$ = this.consService.getTypes();

      this.consService.total$.subscribe(newValue => {this.total = newValue} )
      
    }

    bill(){
      this.route.navigateByUrl('customer/facture')
    }
}
