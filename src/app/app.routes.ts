import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignUpComponent } from './consumer/components/sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';

export const routes: Routes = [
     { path: '', component: LandingPageComponent},
     { path: 'home', component: LandingPageComponent},
     { path: 'signUp', component: SignUpComponent},
     { path: 'customer', loadChildren: () => import('./consumer/consumer.module').then(m => m.ConsumerModule) },
    // { path: 'produits', component: ProductListComponent},
     // { path:'**', redirectTo:''}

     { path: 'login', component: LoginComponent },
     { path: 'register', component: RegisterComponent },
     { path: 'profile', component: ProfileComponent },
     { path: 'user', component: BoardUserComponent },
     { path: 'mod', component: BoardModeratorComponent },
     { path: 'admin', component: BoardAdminComponent },
     { path: '', redirectTo: 'home', pathMatch: 'full' }
];
