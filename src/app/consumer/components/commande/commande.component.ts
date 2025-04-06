import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsumerService } from '../../consumer.service';
import { SpinerComponent } from '../spiner/spiner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commande',
  imports: [
    SpinerComponent,
    CommonModule
  ],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.scss'
})
export class CommandeComponent implements OnInit {

  loading$!: Observable<boolean>;

  constructor(private consService : ConsumerService, ){}

  ngOnInit(): void {

    this.loading$ = this.consService.loading$;
    
  }

}
