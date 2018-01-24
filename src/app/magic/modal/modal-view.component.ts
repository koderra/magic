import {Component, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MgModalService} from './modal.service';

@Component({
  selector: 'mg-modal-view',
  styleUrls: ['./modal-view.component.css'],
  template: `
    <div #mgmodalviewbody></div>
  `
})
export class MgModalViewComponent implements  OnInit {
  @ViewChild('mgmodalviewbody', {read: ViewContainerRef}) viewContainerRef;

  constructor(private modalService: MgModalService, private injector: Injector) {

  }

  // get active(): boolean {
  //   return this.modalService.active;
  // }
  //
  // deactivate() {
  // }

  ngOnInit(): void {
    this.modalService.register(this.viewContainerRef, this.injector);
  }
}

