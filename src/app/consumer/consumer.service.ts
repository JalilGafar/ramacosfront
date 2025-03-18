import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Produit } from "../core/model/produit";
import { environment } from "../../environments/environment";
import { Commande } from "../core/model/commande";

@Injectable ({
    providedIn: 'root'
})
export class ConsumerService {
    constructor (private http: HttpClient) {}
    
      private _produits$ = new BehaviorSubject<Produit[]>([]);
      get produits$(): Observable<Produit[]> {
        return this._produits$.asObservable();
      }

      commande: Commande[]=[];
      total: number = 0;

      private _commande$ = new BehaviorSubject<Commande[]>([]);
      commande$ = this._commande$.asObservable();

      private _total$ = new BehaviorSubject<number>(0);
      total$ = this._total$.asObservable();
    
      getProductsFromServer(){
        //this.setLoadingStatus(true);
        return this.http.get<Produit[]>(`${environment.apiUrl}/api/products`).pipe(
          tap(produits =>{
            this._produits$.next(produits);
        //    this.setLoadingStatus(false); 
          })
        );
      }

      getTypes():Observable<{type: string}[]>{
        return this.http.get<{type: string}[]>(`${environment.apiUrl}/api/types`)
      }

      updateCommande(newCom : Commande) {
        const index = this.commande.findIndex(obj => obj.id_prod === newCom.id_prod);
        if (index !== -1) {
          this.commande[index] = newCom;
        } else {
          this.commande.push(newCom)
        }
        this._commande$.next(this.commande);
        this.total = this.commande.reduce((accumulateur, objet) => accumulateur + objet.pTotal, 0 );
        this._total$.next(this.commande.reduce((accumulateur, objet) => accumulateur + objet.pTotal, 0 ));
        console.log(this.commande)
        console.log(this.total)
        //return this.commande
      }
}