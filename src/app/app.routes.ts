import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignUpComponent } from './consumer/components/sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AdminGuard } from './core/guard/admin.guard';
import { InscrireComponent } from './inscrire/inscrire.component';

export const routes: Routes = [
     { path: 'signUp', component: SignUpComponent},
     { path: 'customer', loadChildren: () => import('./consumer/consumer.module').then(m => m.ConsumerModule) },
    // { path: 'produits', component: ProductListComponent},
     { path: 'login', component: LoginComponent },
     { path: 'register', component: RegisterComponent },
     { path: 'inscrire', component: InscrireComponent },
     { path: 'profile', component: ProfileComponent },
     { path: 'user', component: BoardUserComponent, canActivate: [AuthGuard]  },
     { path: 'mod', component: BoardModeratorComponent, canActivate: [AuthGuard]  },
     { path: 'admin', component: BoardAdminComponent, canActivate: [AdminGuard]  },
     { path: 'home', component: LandingPageComponent},
     { path: '', component: LandingPageComponent},
     // { path: '', redirectTo: 'home', pathMatch: 'full' },
     { path:'**', redirectTo:''}
];
