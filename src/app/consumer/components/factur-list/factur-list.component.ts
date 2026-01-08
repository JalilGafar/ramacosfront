import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../_services/storage.service';
import { ConsumerService } from '../../consumer.service';
import { Order } from '../../../core/model/order';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CommandItemComponent } from '../../../seller/components/command-item/command-item.component';
import { ReplacePipe } from '../../../shared/pipe/replace.pipe';
import { OrderItem } from '../../../core/model/orderitem';
import { Commande } from '../../../core/model/commande';
import { OrderCmd } from '../../../core/model/orderCmd';
import { SpinerComponent } from '../spiner/spiner.component';

@Component({
  selector: 'app-factur-list',
  imports: [
    CommandItemComponent,
    CommonModule,
    ReplacePipe,
    SpinerComponent
  ],
  templateUrl: './factur-list.component.html',
  styleUrl: './factur-list.component.scss'
})
export class FacturListComponent implements OnInit {

  currentUser = '';
  orders$!: Observable<Order[]>;
  order$!: Observable<OrderItem[]>;
  order= new OrderCmd;
  loading$!: Observable<boolean>;

  constructor(
    private storageService: StorageService,
    private consService: ConsumerService,) { }

  ngOnInit(): void {
    this.loading$ = this.consService.loading$;
    this.currentUser = this.storageService.getUser().username;
    this.consService.getMyOrderFromServer(this.currentUser).subscribe()
    this.orders$ = this.consService.order$

  }

  selectOrderItem(id_cmd: number) {
    // console.log(id_cmd);
    this.order$ = this.consService.getOrderItemFromServer(id_cmd)
    this.consService.getOrderItemFromServer(id_cmd).pipe(
      tap(orderItem => {
        let cmd: Commande[];
        cmd = JSON.parse(orderItem[0].contenu)
        this.order = {
          id_cmd: orderItem[0].id_cmd,
          montant: orderItem[0].montant,
          date: orderItem[0].date,
          client: orderItem[0].client,
          localisation: orderItem[0].localisation,
          contenu: cmd
        }
        console.log(this.order)
      })
    ).subscribe()
  }

}
