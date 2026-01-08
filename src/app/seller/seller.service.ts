import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, } from 'rxjs';
import { Order } from '../core/model/order';
import { environment } from '../../environments/environment';
import { OrderItem } from '../core/model/orderitem';
import { Commande } from '../core/model/commande';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient) { }

  private _loading$ = new BehaviorSubject<boolean>(false);
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  private _order$ = new BehaviorSubject<Order[]>([]);
  get order$(): Observable<Order[]> {
    return this._order$.asObservable();
  }

  // Change la valeur de _loading
  private setLoadingStatus(loading: boolean) {
      this._loading$.next(loading)
  }

  getOrderFromServer() {
    this.setLoadingStatus(true);
    return this.http.get<Order[]>(`${environment.apiUrl}/api/products/order`).pipe(
      tap(order => {
        this._order$.next(order);
        this.setLoadingStatus(false); 
      })
    );
  }

  getOrderItemFromServer(id_cmd: number): Observable<OrderItem[]> {
    this.setLoadingStatus(true);
    let idParams = new HttpParams();
    idParams = idParams.append('idCmd', id_cmd);
    return this.http.get<OrderItem[]>(`${environment.apiUrl}/api/products/orderItem`, { params: idParams }).pipe(
      tap(()=>{this.setLoadingStatus(false); })
    )
  }

}
