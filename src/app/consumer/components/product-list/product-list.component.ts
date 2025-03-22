import { Component, OnInit } from '@angular/core';
import { ConsumerService } from '../../consumer.service';
import { Observable } from 'rxjs';
import { Produit } from '../../../core/model/produit';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { Router } from '@angular/router';
import { ReplacePipe } from '../../../shared/pipe/replace.pipe';
import { Commande } from '../../../core/model/commande';
import { StorageService } from '../../../_services/storage.service';

@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    ProductComponent,
    ReplacePipe
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
    commande!: Commande[];
    currentUser!: string;
    disabled = true


    constructor(
      private consService : ConsumerService, 
      private route:Router,
      private storageService: StorageService
    ){}
  
    ngOnInit(): void {
      //this.products = this.productService.getProducts()
      this.consService.commande$.subscribe(newValue => {
        this.commande = newValue;
        if (this.commande.length != 0) {
          this.disabled = false
  
        }else{
          this.disabled = true
        }
      } );
      this.currentUser = this.storageService.getUser().username;
      this.consService.getProductsFromServer().subscribe();
      this.produits$ = this.consService.produits$;

      this.types$ = this.consService.getTypes();

      this.consService.total$.subscribe(newValue => {this.total = newValue} )
      
    }

    // bill(){
    //   this.route.navigateByUrl('customer/facture')
    // }

    annuleCommande(){
      this.consService.annuler();
      window.location.reload();
  
    }
  
    validedCommande(){
      this.consService.sendCommande(this.currentUser).subscribe();
      this.route.navigateByUrl('customer/commande');
    }
  
    // modifCommande(){
    //   this.consService.modifier();
    //   this.route.navigateByUrl('/user');
    // }
}
