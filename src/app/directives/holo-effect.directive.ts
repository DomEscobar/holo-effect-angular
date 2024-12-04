import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[holoEffect]',
  standalone: true
})
export class HoloEffectDirective {
  @Output() transformChange = new EventEmitter<string>();
  @Output() gradientChange = new EventEmitter<string>();

  constructor(private el: ElementRef) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const { left, top, width, height } = this.el.nativeElement.getBoundingClientRect();
    const x = (event.clientX - left) / width;
    const y = (event.clientY - top) / height;
    
    const rotateX = (y - 0.5) * 15;
    const rotateY = (x - 0.5) * 15;
    
    const transform = `
      perspective(1500px)
      rotateX(${-rotateX}deg) 
      rotateY(${rotateY}deg)
      scale3d(1.02, 1.02, 1.02)
    `;
    
    const gradient = `
      linear-gradient(
        ${45 + x * 90}deg, 
        hsla(${(x * 360 + Date.now() * 0.01) % 360}, 95%, 50%, 0.7), 
        hsla(${(y * 360 + Date.now() * 0.01) % 360}, 95%, 50%, 0.7)
      )
    `;

    this.transformChange.emit(transform);
    this.gradientChange.emit(gradient);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.transformChange.emit('perspective(1500px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
    this.gradientChange.emit('linear-gradient(45deg, rgba(255,107,107,0.7), rgba(78,205,196,0.7))');
  }
}