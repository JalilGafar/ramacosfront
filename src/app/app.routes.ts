import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
     { path: '', component: LandingPageComponent},
     { path: 'home', component: LandingPageComponent},
     { path: 'customer', loadChildren: () => import('./consumer/consumer.module').then(m => m.ConsumerModule) },
    // { path: 'produits', component: ProductListComponent},
     { path:'**', redirectTo:''}
];
