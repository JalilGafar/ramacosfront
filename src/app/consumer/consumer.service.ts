import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Produit } from "../core/model/produit";
import { environment } from "../../environments/environment";
import { Commande } from "../core/model/commande";
import { Prospect } from "../core/model/prospect";

@Injectable ({
    providedIn: 'root'
})


export class ConsumerService {
    constructor (private http: HttpClient) {}

    private loading: boolean = false;
    
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
      return this.http.get<{type: string}[]>(`${environment.apiUrl}/api/products/types`)
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
      // console.log(this.commande)
      // console.log(this.total)
      //return this.commande
    }

    sendPospect(prospect : Prospect ){
      return this.http.post<Prospect>(`${environment.apiUrl}/api/prospect`, prospect)
    }

    annuler(){
      this._total$.next(0);
      this._commande$.next([])
    }

    sendCommande(user: string){
      let montant = this.total;
      let laCommande =   JSON.stringify(this.commande);
      this._total$.next(0);
      this._commande$.next([]);
      // console.log(user)
      return this.http.post<{commande:string, total:number}>(`${environment.apiUrl}/api/products/commande`,  {commande: laCommande , total:montant, client: user })
    }

    modifier(){
      
    }

    // Loading Service 

    setLoading(loading: boolean) {
      this.loading = loading;
    }
  
    getLoading(): boolean {
      return this.loading;
    }
 
}