import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductListComponent } from './products/components/product-list/product-list.component';

export const routes: Routes = [
     { path: '', component: LandingPageComponent},
    // { path: 'produits', component: ProductListComponent},
    // { path:'**', redirectTo:''}
];
