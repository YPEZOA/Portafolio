import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showButton!: boolean;

  constructor(
    @Inject(DOCUMENT)
    private document: Document
  ) {}

  @HostListener('window:scroll')
  public windowScroll() {
    const yOffset = window.pageYOffset;
    this.showButton = yOffset > 1390;
  }

  public scrollToTop(): void {
    this.document.documentElement.scrollTop = 0;
  }
}
