import { Component } from '@angular/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
// import { EventBusService } from './_shared/event-bus.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    // HeaderComponent,
    FooterComponent
  ],
  // imports: [
  //   RouterOutlet,
  //   HeaderComponent,
  //   FooterComponent,
  //   // LandingPageComponent
  // ] ,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  isMenuOpen = false;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    // private eventBusService: EventBusService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    // this.eventBusSub = this.eventBusService.on('logout', () => {
    //   this.logout();
    // });
  }

  // Fonction pour basculer l'état du menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Fonction pour fermer le menu
  closeMenu() {
    this.isMenuOpen = false;
  }

  // logout(): void {
  //   this.authService.logout().subscribe({
  //     next: res => {
  //       console.log(res);
  //       this.storageService.clean()  ;
  //       document.cookie = 'bezkoder-session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  //       window.location.reload();
  //     },
  //     error: err => {
  //       console.log(err);
  //     }
  //   });
  // }

  async logout() : Promise<void> {
    try {
      // await this.authService.logout().toPromise();
      await lastValueFrom(this.authService.logout())
      this.storageService.clean();
      document.cookie = 'bezkoder-session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      window.location.reload();
    } catch(err){
      console.log(err);
    }
  }
}
