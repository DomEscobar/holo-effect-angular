import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlitterEffectComponent } from '../glitter-effect/glitter-effect.component';
import { HoloEffectDirective } from '../../directives/holo-effect.directive';

@Component({
  selector: 'app-holographic-card',
  standalone: true,
  imports: [CommonModule, GlitterEffectComponent, HoloEffectDirective],
  template: `
    <div class="card-wrapper">
      <div 
        class="card" 
        [style.transform]="transform"
        holoEffect
        (transformChange)="onTransformChange($event)"
        (gradientChange)="onGradientChange($event)">
        <div class="image-container">
          <img [src]="imageUrl" [alt]="title" class="card-image">
          <div class="overlay-effects">
            <div class="holo-overlay" [style.background]="backgroundGradient"></div>
            <app-glitter-effect></app-glitter-effect>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card-wrapper {
      perspective: 1500px;
      width: 400px;
      height: 560px;
    }

    .card {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 15px;
      transition: transform 0.2s ease;
      transform-style: preserve-3d;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(0,0,0,0.3);
      background: #000;
    }

    .image-container {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 15px;
    }

    .card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      position: relative;
      z-index: 1;
    }

    .overlay-effects {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;
      background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    }

    .holo-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.5;
      mix-blend-mode: screen;
      transition: opacity 0.3s ease;
    }

    .card:hover .holo-overlay {
      opacity: 0.7;
    }
  `]
})
export class HolographicCardComponent {
  @Input() imageUrl: string = '';
  @Input() title: string = 'Holographic Card';
  @Input() description: string = 'A beautiful holographic effect';

  transform: string = '';
  backgroundGradient: string = 'linear-gradient(45deg, rgba(255,107,107,0.5), rgba(78,205,196,0.5))';

  onTransformChange(transform: string) {
    this.transform = transform;
  }

  onGradientChange(gradient: string) {
    this.backgroundGradient = gradient;
  }
}