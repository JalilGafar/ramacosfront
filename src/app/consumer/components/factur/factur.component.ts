import { Component, OnInit } from '@angular/core';
import { ConsumerService } from '../../consumer.service';
import { Commande } from '../../../core/model/commande';

@Component({
  selector: 'app-factur',
  imports: [],
  templateUrl: './factur.component.html',
  styleUrl: './factur.component.scss'
})
export class FacturComponent implements OnInit {

  commande: Commande[] = [] 
  total = 0;

  constructor(private consService : ConsumerService){}

  ngOnInit(): void {

    this.consService.commande$.subscribe(newValue => {this.commande = newValue} );
    this.consService.total$.subscribe(newValue => {this.total = newValue} );
    
  }
}
