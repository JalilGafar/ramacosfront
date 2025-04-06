import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConsumerService } from '../../consumer.service';
import { Observable } from 'rxjs';
import { Produit } from '../../../core/model/produit';
import { CommonModule, DatePipe } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { Router } from '@angular/router';
import { ReplacePipe } from '../../../shared/pipe/replace.pipe';
import { Commande } from '../../../core/model/commande';
import { StorageService } from '../../../_services/storage.service';
import { SpinerComponent } from '../spiner/spiner.component';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    ProductComponent,
    ReplacePipe,
    SpinerComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [DatePipe]
})
export class ProductListComponent implements OnInit {

    products!: Produit[];
    produits$!: Observable <Produit[]>;
    types$!: Observable <{type: string} []>;
    types!: {type: string} [];
    total: number = 0;
    commande!: Commande[];
    currentUser!: string;
    disabled = true;
    loading$!: Observable<boolean>;
    date = Date.now();

    @ViewChild('factureModal') pdfEl!: ElementRef;


    constructor(
      private consService : ConsumerService, 
      private route:Router,
      private storageService: StorageService,
      private datePipe: DatePipe
    ){}

    options = {
      margin: 1,
      filename: 'newfile.pdf',
      image: {
        type: 'jpeg',
        quality: '0.90',
      },
      html2canvas: {
        scale: 2
      },
      jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait'
      }
    }
  
    ngOnInit(): void {
      //this.products = this.productService.getProducts()
      this.loading$ = this.consService.loading$;
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
      //this.consService.sendCommande(this.currentUser).subscribe();
      const pEl:any = document.getElementById('factureModal');

      html2canvas(pEl, {scale:2}).then((canvas)=>{
        const pdf = new jsPDF('p', 'pt','a5',true);
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 10, 300, 500, undefined,'FAST');
        pdf.setProperties({
          title:'Ma facture',
          subject:'Commande du 23/03/2025',
          author:'Ramacos.com'
        })
 
        pdf.setFontSize(12);
        pdf.save('Facture_'+this.datePipe.transform(this.date, 'yyyy-MM-dd')+'.pdf')
      })  

      this.consService.sendCommande(this.currentUser).subscribe();
      this.route.navigateByUrl('customer/commande');
    }
  
    // modifCommande(){
    //   this.consService.modifier();
    //   this.route.navigateByUrl('/user');
    // }
}
