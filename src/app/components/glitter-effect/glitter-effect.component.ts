import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlitterService } from '../../services/glitter.service';

@Component({
  selector: 'app-glitter-effect',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas #glitterCanvas 
      [style.position]="'absolute'"
      [style.top]="'0'"
      [style.left]="'0'"
      [style.width]="'100%'"
      [style.height]="'100%'"
      [style.opacity]="'0.8'"
      [style.mixBlendMode]="'screen'"
      [style.zIndex]="'3'">
    </canvas>
  `,
  providers: [GlitterService]
})
export class GlitterEffectComponent implements AfterViewInit {
  @ViewChild('glitterCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(private glitterService: GlitterService) {}

  ngAfterViewInit() {
    this.glitterService.initializeCanvas(this.canvasRef.nativeElement);
  }

  ngOnDestroy() {
    this.glitterService.destroy();
  }
}