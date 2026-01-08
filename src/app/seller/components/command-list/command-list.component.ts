import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../core/model/order';
import { OrderItem } from '../../../core/model/orderitem';
import { Observable, tap } from 'rxjs';
import { SellerService } from '../../seller.service';
import { CommandItemComponent } from '../command-item/command-item.component';
import { ReplacePipe } from '../../../shared/pipe/replace.pipe';
import { OrderCmd } from '../../../core/model/orderCmd';
import { Commande } from '../../../core/model/commande';
import { ConsumerService } from '../../../consumer/consumer.service';
import { SpinerComponent } from '../../../consumer/components/spiner/spiner.component';

@Component({
  selector: 'app-command-list',
  imports: [
    CommandItemComponent,
    CommonModule,
    ReplacePipe,
    SpinerComponent
  ],
  templateUrl: './command-list.component.html',
  styleUrl: './command-list.component.scss'
})
export class CommandListComponent implements OnInit {

  orders$!: Observable <Order[]>;
  order$!: Observable<OrderItem[]>;
  order= new OrderCmd;
  loading$!: Observable<boolean>;

  constructor(
    private sellerService : SellerService
  ){}

  ngOnInit(): void {
    this.loading$ = this.sellerService.loading$;
    this.sellerService.getOrderFromServer().subscribe()
    this.orders$ = this.sellerService.order$
  }

  selectOrderItem(id_cmd:number){
    // console.log(id_cmd);
    this.order$ = this.sellerService.getOrderItemFromServer(id_cmd)
    this.sellerService.getOrderItemFromServer(id_cmd).pipe(
      tap(orderItem => {
        let cmd : Commande[];
        cmd = JSON.parse(orderItem[0].contenu)
        this.order = {
          id_cmd : orderItem[0].id_cmd,
          montant: orderItem[0].montant,
          date: orderItem[0].date,
          client: orderItem[0].client,
          localisation: orderItem[0].localisation,
          contenu: cmd
        }
        console.log(this.order)
      } )
    ).subscribe()
  }

}
