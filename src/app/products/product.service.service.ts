import { Injectable } from '@angular/core';
import { Produit } from '../core/model/produit';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor (private http: HttpClient) {}

  private _produits$ = new BehaviorSubject<Produit[]>([]);
  get produits$(): Observable<Produit[]> {
    return this._produits$.asObservable();
  }

  getProductsFromServer(){
    //this.setLoadingStatus(true);
    return this.http.get<Produit[]>(`${environment.apiUrl}/api/products`).pipe(
      tap(produits =>{
        this._produits$.next(produits);
    //    this.setLoadingStatus(false); 
      })
    );
  }

  // private products : Produit[] = [
  //   new Produit (
  //     1,
  //     'Dream Cosmetic',
  //     'Caro Light',
  //     'Crème',
  //     'MM',
  //     '300g',
  //     48
  //   ),
  //   new Produit (
  //     2,
  //     'Dream Cosmetic',
  //     'Caro White',
  //     'Crème',
  //     'MM',
  //     '300g',
  //     48
  //   ),
  //   new Produit (
  //     3,
  //     'Dream Cosmetic',
  //     'Paw paw',
  //     'Crème',
  //     'MM',
  //     '300g',
  //     48
  //   ),
  //   new Produit (
  //     3,
  //     'Dream Cosmetic',
  //     'Riche Pure',
  //     'Crème',
  //     'MM',
  //     '300g',
  //     48
  //   ),
  // ];

  // getProducts (): Produit[] {
  //   return [...this.products];
  // }

}
