import { Component, OnInit } from '@angular/core';
import { Produit } from '../../../core/model/produit';
import { ProduitComponent } from '../produit/produit.component';
import { ProductServiceService } from '../../product.service.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    ProduitComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  products!: Produit[];
  produits$!: Observable <Produit[]>;

  constructor(private productService : ProductServiceService){}

  ngOnInit(): void {
    //this.products = this.productService.getProducts()
    this.productService.getProductsFromServer().subscribe();
    this.produits$ = this.productService.produits$;
    
  }

}
