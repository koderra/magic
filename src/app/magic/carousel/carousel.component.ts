import {Component, Input, Renderer2, ElementRef, OnInit} from '@angular/core';
import {MgCarouselSlideComponent} from './carousel-slide.component';

@Component({
  selector: 'mg-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class MgCarouselComponent implements OnInit {
  private currentSlide;
  private slides: Array<MgCarouselSlideComponent> = [];

  @Input() delay = 3;

  constructor() {
  }

  ngOnInit(): void {
    this.showFirstSlide();
    setInterval(() => {
      if (!this.currentSlide) {
        return this.showFirstSlide();
      }

      this.showNextSlide();
    }, this.delay * 1000);
  }

  register(slide: MgCarouselSlideComponent) {
    this.slides.push(slide);
  }

  /// private

  private showFirstSlide(animate?: string) {
    for (const slide of this.slides) {
      if (!slide.cover) {
        slide.show(animate);
        this.currentSlide = slide;
        return
      }
    }
  }

  private showNextSlide(animate?: string, endIndex?: number) {

    if (!endIndex || endIndex === -1) {
      endIndex = this.slides.length - 1;
    }

    let idx = this.slides.indexOf(this.currentSlide);
    if (idx >= endIndex - 1) {
      idx = -1;
    }

    for (let i = idx + 1; idx < endIndex; i++) {
      if (!this.slides[i].cover && this.slides[i].ready) {
        this.slides[i].show(animate);
        this.currentSlide.hide(animate);
        this.currentSlide = this.slides[i];
        return;
      }
    }

    this.showNextSlide(animate, this.slides.indexOf(this.currentSlide));
  }

}
