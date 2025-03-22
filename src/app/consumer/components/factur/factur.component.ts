import { Component, OnInit } from '@angular/core';
import { ConsumerService } from '../../consumer.service';
import { Commande } from '../../../core/model/commande';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ReplacePipe } from '../../../shared/pipe/replace.pipe';
import { StorageService } from '../../../_services/storage.service';

@Component({
  selector: 'app-factur',
  imports: [
    SharedModule,
    ReplacePipe
  ],
  templateUrl: './factur.component.html',
  styleUrl: './factur.component.scss'
})
export class FacturComponent implements OnInit {

  commande: Commande[] = [] 
  total = 0;
  currentUser!: string;

  constructor(
    private consService : ConsumerService, 
    private router: Router,
    private storageService: StorageService
  ){}

  ngOnInit(): void {

    this.consService.commande$.subscribe(newValue => {this.commande = newValue} );
    this.consService.total$.subscribe(newValue => {this.total = newValue} );
    this.currentUser = this.storageService.getUser().username;
    
  }

  annuleCommande(){
    this.consService.annuler();
    this.router.navigateByUrl('/user');

  }

  validedCommande(){
    this.consService.sendCommande(this.currentUser).subscribe();
    this.router.navigateByUrl('customer/commande');
  }

  modifCommande(){
    this.consService.modifier();
    this.router.navigateByUrl('/user');
  }
}
