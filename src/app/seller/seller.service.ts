import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Order } from '../core/model/order';
import { environment } from '../../environments/environment';
import { OrderItem } from '../core/model/orderitem';
import { Commande } from '../core/model/commande';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient) { }

  private _order$ = new BehaviorSubject<Order[]>([]);
      get order$(): Observable<Order[]> {
        return this._order$.asObservable();
  }

  getOrderFromServer(){
    //this.setLoadingStatus(true);
    return this.http.get<Order[]>(`${environment.apiUrl}/api/products/order`).pipe(
      tap(order =>{
        this._order$.next(order);
    //    this.setLoadingStatus(false); 
      })
    );
  }

  getOrderItemFromServer(id_cmd:number): Observable <OrderItem[]>{
    let idParams = new HttpParams();
    idParams = idParams.append('idCmd', id_cmd);
    return this.http.get<OrderItem[]>(`${environment.apiUrl}/api/products/orderItem`, {params: idParams})
  }
  
}
