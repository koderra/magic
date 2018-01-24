import {Component, HostListener} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';

@Component({
  selector: 'mg-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolBarComponent {

  public transparent: boolean;
  public home: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        event.url === '/home' || event.url === '/' ? this.home = true : this.home = false;
        if (!this.home) {
          this.transparent = false;
        } else {
          this.transparent = true;
        }
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (event.path[1].scrollY > 84 || !this.home) {
      this.transparent = false;
    } else {
      this.transparent = true;
    }
  }
}
