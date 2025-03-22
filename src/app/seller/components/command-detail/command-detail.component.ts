import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../core/model/order';

@Component({
  selector: 'app-command-detail',
  imports: [],
  templateUrl: './command-detail.component.html',
  styleUrl: './command-detail.component.scss'
})
export class CommandDetailComponent implements OnInit {

  @Input() order!: Order;

  ngOnInit(): void {
    
  }

}
