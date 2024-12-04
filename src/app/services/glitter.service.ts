import { Injectable } from '@angular/core';
import { Glitter } from '../models/glitter.model';

@Injectable()
export class GlitterService {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private glitters: Glitter[] = [];
  private animationFrame: number = 0;
  private lastTime: number = 0;

  initializeCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true })!;
    this.setupCanvas();
    this.createGlitters();
    this.animate();

    const resizeObserver = new ResizeObserver(() => this.setupCanvas());
    resizeObserver.observe(canvas);
  }

  private setupCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  private createGlitters() {
    const numGlitters = 100; // Increased number of particles
    for (let i = 0; i < numGlitters; i++) {
      this.glitters.push(this.createGlitter());
    }
  }

  private createGlitter(): Glitter {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: Math.random() * 4 + 2, // Increased size
      opacity: Math.random() * 0.7 + 0.3, // Increased opacity
      angle: Math.random() * Math.PI * 2,
      speed: 0.1 + Math.random() * 0.4, // Increased speed
      scale: 0.3 + Math.random() * 0.7 // Increased scale
    };
  }

  private animate(currentTime: number = 0) {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.glitters.forEach(glitter => {
      this.ctx.save();
      this.ctx.translate(glitter.x, glitter.y);
      this.ctx.rotate(glitter.angle);
      this.ctx.scale(glitter.scale, glitter.scale);
      
      // Enhanced gradient for more sparkle
      const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, glitter.size);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${glitter.opacity})`);
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${glitter.opacity * 0.5})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      this.ctx.fillStyle = gradient;
      
      // Draw a star shape instead of a rectangle
      this.ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        const x = Math.cos(angle) * glitter.size;
        const y = Math.sin(angle) * glitter.size;
        if (i === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.closePath();
      this.ctx.fill();
      
      this.ctx.restore();

      // Enhanced animation
      glitter.opacity = (Math.sin(currentTime * 0.002 + glitter.x + glitter.y) * 0.4 + 0.6) * 0.8;
      glitter.angle += glitter.speed * 0.02 * (deltaTime || 16);
      glitter.scale = 0.3 + (Math.sin(currentTime * 0.002 + glitter.x) * 0.4 + 0.6) * 0.7;

      // Diagonal movement
      glitter.y += glitter.speed * (deltaTime || 16) * 0.1;
      glitter.x += Math.sin(currentTime * 0.001) * 0.5;

      // Reset position when out of bounds
      if (glitter.y > this.canvas.height) {
        glitter.y = -glitter.size;
        glitter.x = Math.random() * this.canvas.width;
      }
      if (glitter.x > this.canvas.width) {
        glitter.x = -glitter.size;
      }
      if (glitter.x < -glitter.size) {
        glitter.x = this.canvas.width;
      }
    });

    this.animationFrame = requestAnimationFrame((time) => this.animate(time));
  }

  destroy() {
    cancelAnimationFrame(this.animationFrame);
  }
}