import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../core/model/order';
import { CommonModule } from '@angular/common';
import { ReplacePipe } from '../../../shared/pipe/replace.pipe';

@Component({
  selector: 'app-command-item',
  imports: [
    CommonModule,
    ReplacePipe
  ],
  templateUrl: './command-item.component.html',
  styleUrl: './command-item.component.scss'
})
export class CommandItemComponent implements OnInit{

  @Input() order!: Order;

  constructor(){}

  ngOnInit(): void {
    
  }
}
