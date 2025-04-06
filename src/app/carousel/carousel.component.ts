import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap'

@Component({
  selector: 'app-carousel',
  imports: [
    CommonModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() images: string[] = [];
  @Input() speed: number = 0.5; // vitesse en secondes
  @Input() direction: 'left' | 'right' = 'left';
  
  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLDivElement>;
  
  private animation: any;
  private isPaused = false;

  ngOnInit() {
    // Duplique les images pour créer un effet infini
    this.images = [...this.images, ...this.images];
  }

  ngAfterViewInit() {
    this.startAnimation();
  }

  startAnimation() {
    const track = this.carouselTrack.nativeElement;
    const width = track.children[0].clientWidth;
    const duration = (width * this.images.length / 2) / (100 / this.speed);
    
    gsap.set(track, { x: 0 });
    
    this.animation = gsap.to(track, {
      x: this.direction === 'left' ? `-=${width * this.images.length / 2}` : `+=${width * this.images.length / 2}`,
      duration: duration,
      ease: "none",
      repeat: -1
    });
  }

  togglePause() {
    if (this.isPaused) {
      this.animation.play();
    } else {
      this.animation.pause();
    }
    this.isPaused = !this.isPaused;
  }

  ngOnDestroy() {
    if (this.animation) {
      this.animation.kill();
    }
  }
}
