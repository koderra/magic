import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'mg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class MgButtonComponent {

  @Input() navigate: string;
  @Input() buttonClick;

  processing;

  constructor(private router: Router) {
  }

  buttonClicked() {
    if (this.navigate) {
      this.router.navigateByUrl(this.navigate);
    } else if (this.buttonClick) {
      this.processing = true;
      const promise = this.buttonClick();
      if (!promise || ! (promise instanceof Promise)) {
        this.processing = false;
      } else {
        promise.then(() => {
          this.processing = false;
        }).catch((err) => {
          this.processing = false;
          console.log('Shit happened! ' + err);
        });
      }
    }
  }
}
