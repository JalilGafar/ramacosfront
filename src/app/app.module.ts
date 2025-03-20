import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    // AppComponent,
    // LoginComponent,
    // RegisterComponent,
    // LandingPageComponent,
    // ProfileComponent,
    // BoardAdminComponent,
    // BoardModeratorComponent,
    // BoardUserComponent
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    // FormsModule,
    // HttpClientModule
  ],
  providers: [httpInterceptorProviders],
//   bootstrap: [AppComponent]
})
export class AppModule { }
