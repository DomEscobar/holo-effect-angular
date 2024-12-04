import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HolographicCardComponent } from './app/components/holographic-card/holographic-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HolographicCardComponent],
  template: `
    <div class="container">
      <app-holographic-card
        imageUrl="https://railway-backend-production-8d2b.up.railway.app/uploads/image-1733121791159.png"
        title="Cosmic Kitten"
        description="A rare holographic trading card featuring an adorable space kitten">
      </app-holographic-card>
    </div>
  `,
  styles: [`
    .container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #1a1a1a;
      padding: 20px;
    }
  `]
})
export class App {
}

bootstrapApplication(App);