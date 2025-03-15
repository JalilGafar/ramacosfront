import { Component, Input, OnInit } from '@angular/core';
import { Produit } from '../../../core/model/produit';

@Component({
  selector: 'app-produit',
  imports: [],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.scss'
})
export class ProduitComponent implements OnInit {

  @Input() produit!: Produit;

  ngOnInit(): void {
    
  }

}
