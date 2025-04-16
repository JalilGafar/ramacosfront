import { Component, Input, OnInit } from '@angular/core';
import { Produit } from '../../../core/model/produit';
import { map, Observable, tap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ConsumerService } from '../../consumer.service';
import { Commande } from '../../../core/model/commande';
import { ReplacePipe } from '../../../shared/pipe/replace.pipe';

@Component({
  selector: 'app-product',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ReplacePipe
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  @Input() produit!: Produit;

  element$!: Observable<{designation:string, qte:number}> ;
  qte = new FormControl(0);
  element!: {designation:string, qte:number}
  somme: number = 0;
  somme$!: Observable<number>;
   quanti!: FormGroup;
   newCommand!: Commande ;

   constructor(private formBuilder: FormBuilder, private consumerService: ConsumerService){
    this.qte.valueChanges.subscribe(value => {
      if (value! < 0) {
        this.qte.setValue(0,{emitEvent:false} );
      }
    });

   }
  
  ngOnInit(): void {
    //this.element.designation = this.produit.type +' ' + this.produit.marque

    //const produit = new
    
    this.quanti = this.formBuilder.group({
      qte: [0]
    });


    
    this.element$ = this.quanti.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        designation :  this.produit.type +' ' + this.produit.marque
      }) )
    );

    this.somme$ = this.qte.valueChanges.pipe(
      map(Value => {
        if (Value != null && Value >= 0 ) {
          // this.newCommand.designation = this.produit.type+' '+this.produit.marque+' '+this.produit.taille;
          // this.newCommand.id_prod = this.produit.id_prod;
          // this.newCommand.quantite = Value;
          // this.newCommand.pUnit = this.produit.prix;
          // this.newCommand.pTotal = this.produit.prix * Value
          if (this.produit.type === 'Divers') {
            this.consumerService.updateCommande({
              id_prod:this.produit.id_prod, 
              designation: this.produit.marque+' '+this.produit.taille , 
              quantite:Value,
              pUnit: this.produit.prix,
              pTotal : this.produit.prix * Value
            })
          } else {
            this.consumerService.updateCommande({
              id_prod:this.produit.id_prod, 
              designation: this.produit.type+' '+this.produit.marque+' '+this.produit.taille , 
              quantite:Value,
              pUnit: this.produit.prix,
              pTotal : this.produit.prix * Value
            })
          }
          // console.log({designation: this.produit.type + ' ' + this.produit.marque, quantite:Value})
          return Value *  this.produit.prix
        } else {
          return 0
        }
      }   )
    )
  }

  add(){
     this.qte.setValue(this.qte.value! + 1)
  }

  moins(){
    if (this.qte.value == 0) {
      
    } else {
      this.qte.setValue(this.qte.value! - 1)
    }
  }

}
