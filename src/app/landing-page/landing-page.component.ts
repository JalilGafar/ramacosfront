import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../_services/user.service';
import { CarouselComponent } from '../carousel/carousel.component';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    SharedModule,
    CarouselComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit{
  content?: string;
  isLoggedIn = false;

  carouselImages = [
    'images/carousel/abana.webp',
    'images/carousel/richpure.webp',
    'images/carousel/ahcdefri.webp',
    'images/carousel/pawpaw.webp',
    'images/carousel/carotoneface.webp',
    'images/carousel/cw.webp',
    'images/carousel/elixir.webp',
    'images/carousel/laitglutawhite.webp',
    'images/carousel/cocoderm.webp',
    'images/carousel/precious.webp',
    'images/carousel/carotone.webp',
    'images/carousel/tj.webp',
    'images/carousel/wsface.webp',
    'images/carousel/alphacar.webp',
    'images/carousel/evc.webp',
    'images/carousel/laitws.webp',
    'images/carousel/manianga.webp',
    'images/carousel/savonsivoderm.webp',
    'images/carousel/serumcolla.webp',
    'images/carousel/vaselinegame.webp',
    'images/carousel/caroderma.webp',
  ];

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
    if (this.storageService.isLoggedIn()) {
      this.router.navigateByUrl('/user')
      // setTimeout( () => {this.router.navigateByUrl('/user')} , 2000 )
    }
  }

  
}
